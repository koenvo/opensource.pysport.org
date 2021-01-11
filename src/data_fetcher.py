import json
import re
from datetime import datetime

import requests
import luigi
import luigi.format

url = "https://api.github.com/repos/PySport/kloppy/contributors"
"""

R:
    CRAN https://cran.r-project.org/package=nflfastR

"""


def download_to(url, fp):
    data = requests.get(url)
    if data.status_code != 404:
        fp.write(data.text)
    else:
        fp.write("404")


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
                fp.write("")
            else:
                regex = r'name=["\'](.+?)["\']'
                match = re.search(regex, data)
                download_to(
                    f"https://pypi.org/pypi/{match.group(1)}/json",
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


class CollectPackageInfo(luigi.Task):
    date = luigi.DateParameter()
    repository = luigi.Parameter()

    def requires(self):
        return {
            'language': FetchGithubLanguage(repository=self.repository),
            'commits': FetchGithubCommits(repository=self.repository, date=self.date)
        }

    def output(self):
        return luigi.LocalTarget(f"tmp_data/{self.repository}/output/{self.date}.json")

    def run(self):
        with self.input()['language'].open('r') as fp:
            languages = json.load(fp)

        python_counter = languages.get('Python', 0)
        r_counter = languages.get('R', 0)

        if python_counter > r_counter:
            language = "Python"
        else:
            language = "R"

        if language == "Python":
            package_info = yield FetchPyPiInfo(date=self.date, repository=self.repository)


        data = {
            'language': language
        }

        with self.output().open('w') as fp:
            json.dump(data, fp)


if __name__ == "__main__":
    now = datetime.now()

    #
    tasks = [
        CollectPackageInfo(repository="chonyy/ML-auto-baseball-pitching-overlay", date=now),
        CollectPackageInfo(repository="PySport/kloppy", date=now),
        CollectPackageInfo(repository="mrcaseb/nflfastR", date=now)
    ]
    luigi.build(tasks, local_scheduler=True)
