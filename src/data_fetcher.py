import json
import os
import re
import urllib.error

import marko
from bs4 import BeautifulSoup
import pandas as pd

import requests
import luigi
import luigi.format

"""
url = "https://api.github.com/repos/PySport/kloppy/contributors"

R:
    CRAN https://cran.r-project.org/package=nflfastR

"""

BASE_DIR = "data"


def download_to(url, fp):
    data = requests.get(url)
    if data.status_code != 404:
        fp.write(data.text)
    else:
        fp.write("404")


class FetchGithubUser(luigi.Task):
    login = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/github_users/{self.login}.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/users/{self.login}",
                fp
            )


class FetchGithubPythonSetup(luigi.Task):
    file = luigi.Parameter()
    repository = luigi.Parameter()
    branch = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/github/{self.file}")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://raw.githubusercontent.com/{self.repository}/{self.branch}/{self.file}",
                fp
            )


class FetchPyPiInfo(luigi.Task):
    file = luigi.Parameter()
    run_id = luigi.Parameter()
    repository = luigi.Parameter()
    branch = luigi.Parameter()

    def requires(self):
        return FetchGithubPythonSetup(file=self.file, repository=self.repository, branch=self.branch)

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/pypi/{self.run_id}.json")

    def run(self):
        with self.input().open('r') as fp:
            data = fp.read()

        with self.output().open('w') as fp:
            if data == "404":
                package_info = dict(
                    status="undefined"
                )
            else:
                regex = r'name\s*=\s*["\'](.+?)["\']'
                match = re.search(regex, data)

                response = requests.get(f"https://pypi.org/pypi/{match.group(1)}/json")
                if response.status_code == 404:
                    package_info = dict(
                        status="not_found",
                        name=match.group(1)
                    )
                else:
                    data = response.json()
                    package_info = dict(
                        status="found",
                        name=match.group(1),
                        version=data['info']['version'],
                        url=data['info']['package_url'],
                        license=data['info']['license']
                    )

            json.dump(package_info, fp)


class FetchGithubRDescription(luigi.Task):
    repository = luigi.Parameter()
    branch = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/github/DESCRIPTION")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://raw.githubusercontent.com/{self.repository}/{self.branch}/DESCRIPTION",
                fp
            )


class FetchCRANInfo(luigi.Task):
    run_id = luigi.Parameter()
    repository = luigi.Parameter()
    branch = luigi.Parameter()

    def requires(self):
        return FetchGithubRDescription(repository=self.repository, branch=self.branch)

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/cran/{self.run_id}.json")

    def run(self):
        with self.input().open('r') as fp:
            data = fp.read()

        with self.output().open('w') as fp:
            if data == "404":
                package_info = dict(
                    status="undefined"
                )
            else:
                regex = r'Package: (.+?)\n'
                match = re.search(regex, data)
                name = match.group(1)
                url = f"https://cran.r-project.org/package={name}"
                try:
                    df = pd.read_html(url)
                except urllib.error.HTTPError:
                    regex = r'License: (.+?)\n'
                    match = re.search(regex, data + '\n')
                    license_ = match.group(1)
                    if 'MIT' in license_:
                        license_ = 'MIT'

                    package_info = dict(
                        status="not_found",
                        license=license_,
                        name=name
                    )
                else:
                    data = dict(zip(df[0][0], df[0][1]))

                    license_ = data['License:']
                    if 'MIT' in license_:
                        license_ = 'MIT'

                    package_info = dict(
                        status="found",
                        name=match.group(1),
                        version=data['Version:'],
                        url=url,
                        license=license_
                    )

            json.dump(package_info, fp)


class FetchGithubRepoInfo(luigi.Task):
    repository = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/github/repository.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/repos/{self.repository}",
                fp
            )


class FetchGithubRepoTree(luigi.Task):
    run_id = luigi.Parameter()
    repository = luigi.Parameter()
    branch = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/github/{self.run_id}_tree.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/repos/{self.repository}/git/trees/{self.branch}",
                fp
            )


class FetchGithubRepoContributors(luigi.Task):
    run_id = luigi.Parameter()
    repository = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/github/{self.run_id}_contributors.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/repos/{self.repository}/contributors",
                fp
            )


class FetchGithubReadme(luigi.Task):
    run_id = luigi.Parameter()
    repository = luigi.Parameter()
    branch = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/github/{self.run_id}_readme.md")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://raw.githubusercontent.com/{self.repository}/{self.branch}/README.md",
                fp
            )


class FetchGithubLanguage(luigi.Task):
    repository = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/github/language.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/repos/{self.repository}/languages",
                fp
            )


class FetchGithubCommits(luigi.Task):
    run_id = luigi.Parameter()
    repository = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/tmp/{self.repository}/github/{self.run_id}_commits.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/repos/{self.repository}/commits",
                fp
            )


def determine_project_type(language, languages, package_info, files):
    if package_info['status'] == 'found':
        return language, 'package'
    elif package_info['status'] == 'not_found':
        return language, 'github_package'
    else:
        if languages.get('Jupyter Notebook', 0) > languages.get('Python', 0):
            return 'Python', 'tutorial'
        if any([file.endswith(".rmd") for file in files]):
            return 'R', 'tutorial'

        return language, 'repository'


def extract_logo_url(repository, branch, content):
    base_url = f"https://raw.githubusercontent.com/{repository}/{branch}/"
    for line in content.splitlines()[:10]:
        if '<img' in line:
            soup = BeautifulSoup(line, features="lxml")
            img = soup.find('img')
            if img:
                # if img.attrs.get('align') == "right":
                url = img.attrs.get('src')
                if url.startswith('http'):
                    return url
                else:
                    return base_url + url
    return None


def extract_images(repository, branch, content):
    images = []
    base_url = f"https://raw.githubusercontent.com/{repository}/{branch}/"

    def repl(m):
        return '[' + m.group(1).replace("\n", " ").replace("\r", " ") + ']'
    content = re.sub('\\[([^\\]]+)\\]', repl, content)

    content_html = marko.convert(content)
    for line in content_html.splitlines()[10:]:
        if '<img' in line:
            soup = BeautifulSoup(line, features="lxml")
            img = soup.find('img')
            if img:
                # if img.attrs.get('align') == "right":
                url = img.attrs.get('src')
                if url.startswith('http'):
                    if url.startswith('https://github.com') or url.startswith('https://raw.githubusercontent.com'):
                        images.append(url)
                else:
                    images.append(base_url + url)
    return images


class CollectProjectInfo(luigi.Task):
    run_id = luigi.Parameter()
    repository = luigi.Parameter()

    def requires(self):
        return {
            'repository': FetchGithubRepoInfo(repository=self.repository),
            'language': FetchGithubLanguage(repository=self.repository),
            'commits': FetchGithubCommits(repository=self.repository, run_id=self.run_id)
        }

    def output(self):
        return luigi.LocalTarget(f"{BASE_DIR}/output/{self.run_id}/{self.repository.replace('/', '__')}.json")

    def run(self):
        with self.input()['language'].open('r') as fp:
            languages = json.load(fp)

        with self.input()['commits'].open('r') as fp:
            commits = json.load(fp)

        with self.input()['repository'].open('r') as fp:
            repository_info = json.load(fp)
            default_branch = repository_info['default_branch']

        tree_output = yield FetchGithubRepoTree(repository=self.repository, run_id=self.run_id, branch=default_branch)
        with tree_output.open('r') as fp:
            tree = json.load(fp)
        files = [file['path'].lower() for file in tree['tree']]

        notebook_counter = languages.get('Jupyter Notebook', 0)
        python_counter = languages.get('Python', 0) + notebook_counter
        r_counter = languages.get('R', 0)

        if python_counter > r_counter:
            language = "Python"
        else:
            language = "R"

        readme = ''
        if 'readme.md' in files:
            readme_output = yield FetchGithubReadme(repository=self.repository, run_id=self.run_id, branch=default_branch)
            with readme_output.open('r') as fp:
                readme = fp.read()

        logo_url = extract_logo_url(self.repository, default_branch, readme)
        images = extract_images(self.repository, default_branch, readme)

        package_info_output = None
        if language == "Python":
            if 'setup.py' in files:
                package_info_output = yield FetchPyPiInfo(
                    file='setup.py',
                    run_id=self.run_id,
                    repository=self.repository,
                    branch=default_branch
                )
            elif 'pyproject.toml' in files:
                package_info_output = yield FetchPyPiInfo(
                    file='pyproject.toml',
                    run_id=self.run_id,
                    repository=self.repository,
                    branch=default_branch
                )
            else:
                package_info = dict(
                    status="undefined"
                )
        else:
            if 'description' in files:
                package_info_output = yield FetchCRANInfo(run_id=self.run_id, repository=self.repository, branch=default_branch)
            else:
                package_info = dict(
                    status="undefined"
                )

        if package_info_output:
            with package_info_output.open('r') as fp:
                package_info = json.load(fp)

        if package_info.get('license'):
            license_ = package_info['license']
        elif 'license' in repository_info and repository_info['license']:
            license_ = repository_info['license']['spdx_id']
        else:
            license_ = None

        language, type_ = determine_project_type(
            language,
            languages,
            package_info,
            files
        )

        urls = {
            'github': f"https://github.com/{self.repository}"
        }
        if package_info['status'] == 'found':
            if language == 'R':
                urls['cran'] = package_info['url']
            else:
                urls['pypi'] = package_info['url']
        if repository_info['homepage']:
            urls['website'] = repository_info['homepage']

        data = {
            'name': package_info.get('name', os.path.basename(self.repository)),
            'language': language,
            'license': license_,
            'latestVersion': package_info.get('version'),
            'lastCommit': {
                'sha': commits[0]['sha'],
                'date': commits[0]['commit']['committer']['date'],
                'message': commits[0]['commit']['message']
            },
            'type': type_,
            'logoUrl': logo_url,
            'images': [dict(url=img) for img in images],
            'urls': urls
        }

        with self.output().open('w') as fp:
            json.dump(data, fp, indent=4)


class CollectAll(luigi.Task):
    def requires(self):
        return luigi.LocalTarget("list.csv")

    def run(self):
        pass



if __name__ == "__main__":
    run_id = '2021-01-13.1'

    #
    tasks = [
        #CollectPackageInfo(repository="chonyy/ML-auto-baseball-pitching-overlay", date=now),
        #CollectProjectInfo(repository="PySport/kloppy", run_id=run_id),
        CollectProjectInfo(repository="Dato-Futbol/soccerAnimate", run_id=run_id),
        CollectProjectInfo(repository="mrcaseb/nflfastR", run_id=run_id),
        #CollectProjectInfo(repository="maksimhorowitz/nflscrapR", date=now),
        CollectProjectInfo(repository="ML-KULeuven/socceraction", run_id=run_id),
        CollectProjectInfo(repository="ML-KULeuven/soccer_xg", run_id=run_id),
        CollectProjectInfo(repository="FCrSTATS/SportsCodeR", run_id=run_id),
        CollectProjectInfo(repository="Slothfulwave612/soccerplots", run_id=run_id)
        #CollectProjectInfo(repository="arbues6/Euroleague-ML", date=now),
        #CollectProjectInfo(repository="Friends-of-Tracking-Data-FoTD/SoccermaticsForPython", date=now)
    ]
    luigi.build(tasks, local_scheduler=True)
