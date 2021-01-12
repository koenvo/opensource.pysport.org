import json
import re
import urllib.error
from datetime import datetime
import pandas as pd

import requests
import luigi
import luigi.format

"""
url = "https://api.github.com/repos/PySport/kloppy/contributors"

R:
    CRAN https://cran.r-project.org/package=nflfastR

"""


def download_to(url, fp):
    data = requests.get(url)
    if data.status_code != 404:
        fp.write(data.text)
    else:
        fp.write("404")


class FetchGithubUser(luigi.Task):
    login = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"tmp_data/github_users/{self.login}.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/users/{self.login}",
                fp
            )


class FetchGithubPythonSetup(luigi.Task):
    repository = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"tmp_data/{self.repository}/github/setup.py")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://raw.githubusercontent.com/{self.repository}/master/setup.py",
                fp
            )


class FetchPyPiInfo(luigi.Task):
    date = luigi.DateParameter()
    repository = luigi.Parameter()

    def requires(self):
        return FetchGithubPythonSetup(repository=self.repository)

    def output(self):
        return luigi.LocalTarget(f"tmp_data/{self.repository}/pypi/{self.date}.json")

    def run(self):
        with self.input().open('r') as fp:
            data = fp.read()

        with self.output().open('w') as fp:
            if data == "404":
                package_info = dict(
                    status="undefined"
                )
            else:
                regex = r'name=["\'](.+?)["\']'
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

    def output(self):
        return luigi.LocalTarget(f"tmp_data/{self.repository}/github/DESCRIPTION")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://raw.githubusercontent.com/{self.repository}/master/DESCRIPTION",
                fp
            )


class FetchCRANInfo(luigi.Task):
    date = luigi.DateParameter()
    repository = luigi.Parameter()

    def requires(self):
        return FetchGithubRDescription(repository=self.repository)

    def output(self):
        return luigi.LocalTarget(f"tmp_data/{self.repository}/cran/{self.date}.json")

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
                url = f"https://cran.r-project.org/package={match.group(1)}"
                try:
                    df = pd.read_html(url)
                except urllib.error.HTTPError:
                    package_info = dict(
                        status="not_found",
                        name=match.group(1)
                    )
                else:
                    data = dict(zip(df[0][0], df[0][1]))

                    package_info = dict(
                        status="found",
                        name=match.group(1),
                        version=data['Version:'],
                        url=url,
                        license=data['License:']
                    )

            json.dump(package_info, fp)


class FetchGithubRepoInfo(luigi.Task):
    repository = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"tmp_data/{self.repository}/github/repository.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/repos/{self.repository}",
                fp
            )


class FetchGithubRepoContributors(luigi.Task):
    date = luigi.DateParameter()
    repository = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"tmp_data/{self.repository}/github/{self.date}_contributors.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/repos/{self.repository}/contributors",
                fp
            )


class FetchGithubLanguage(luigi.Task):
    repository = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"tmp_data/{self.repository}/github/language.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/repos/{self.repository}/languages",
                fp
            )


class FetchGithubCommits(luigi.Task):
    date = luigi.DateParameter()
    repository = luigi.Parameter()

    def output(self):
        return luigi.LocalTarget(f"tmp_data/{self.repository}/github/{self.date}_commits.json")

    def run(self):
        with self.output().open('w') as fp:
            download_to(
                f"https://api.github.com/repos/{self.repository}/commits",
                fp
            )


class CollectProjectInfo(luigi.Task):
    date = luigi.DateParameter()
    repository = luigi.Parameter()

    def requires(self):
        return {
            'repository': FetchGithubRepoInfo(repository=self.repository),
            'language': FetchGithubLanguage(repository=self.repository),
            'commits': FetchGithubCommits(repository=self.repository, date=self.date)
        }

    def output(self):
        return luigi.LocalTarget(f"tmp_data/output/{self.date}/{self.repository.replace('/', '__')}.json")

    def run(self):
        with self.input()['language'].open('r') as fp:
            languages = json.load(fp)

        with self.input()['repository'].open('r') as fp:
            repository_info = json.load(fp)

        python_counter = languages.get('Python', 0) + languages.get('Jupyter Notebook', 0)
        r_counter = languages.get('R', 0)

        if python_counter > r_counter:
            language = "Python"
        else:
            language = "R"

        if language == "Python":
            package_info_input = yield FetchPyPiInfo(date=self.date, repository=self.repository)
        else:
            package_info_input = yield FetchCRANInfo(date=self.date, repository=self.repository)

        with package_info_input.open('r') as fp:
            package_info = json.load(fp)

        if 'license' in package_info:
            license = package_info['license']
        elif 'license' in repository_info and repository_info['license']:
            license = repository_info['license']['name']
        else:
            license = None

        data = {
            'language': language,
            'license': license
        }

        with self.output().open('w') as fp:
            json.dump(data, fp)


class CollectAll(luigi.Task):
    def requires(self):
        return luigi.LocalTarget("list.csv")

    def run(self):
        pass



if __name__ == "__main__":
    now = datetime.now()

    #
    tasks = [
        #CollectPackageInfo(repository="chonyy/ML-auto-baseball-pitching-overlay", date=now),
        CollectProjectInfo(repository="PySport/kloppy", date=now),
        CollectProjectInfo(repository="mrcaseb/nflfastR", date=now),
        CollectProjectInfo(repository="maksimhorowitz/nflscrapR", date=now),
        CollectProjectInfo(repository="ML-KULeuven/socceraction", date=now),
        CollectProjectInfo(repository="arbues6/Euroleague-ML", date=now),
        CollectProjectInfo(repository="Friends-of-Tracking-Data-FoTD/SoccermaticsForPython", date=now)
    ]
    luigi.build(tasks, local_scheduler=True)
