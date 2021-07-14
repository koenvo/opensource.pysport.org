# Welcome to the repository of [opensource.pysport.org](https://opensource.pysport.org)!

## Contents

This repository contains the [backend](#backend), [frontend](#frontend) and [data](#data) needed for opensource.pysport.org. 

### Backend
<a name="backend"></a>

The backend is written in Python and its main task is to collect data from all opensource projects and aggregate it to json files than can be used by the backend.

For task orchestration we used [luigi](https://github.com/spotify/luigi). This projects contains a lot of small tasks that are somehow dependent on each other. Luigi helps here to make sure all tasks are executed in the right order, and connects inputs and output.


### Frontend
<a name="frontend"></a>

The frontend is written in Javascript using the [Next.js](https://nextjs.org/) framework. This framework provides a ton of handy stuff on top of [React](https://react.org). For layout of the page we used [tailwind CSS](https://tailwindcss.com/). The app itself is served using [vercel](https://vercel.com)

### Data
<a name="data"></a>

We collect data from:
- [github](https://github.com): contributors, commits, language, project type and readme (images)
- [pypi](https://pypi.org): name of the project, url to pypi page, latest version, license and description
- [CRAN](https://cran.org): name of the project, url to CRAN page, latest version and license


## Contribute

Found a cool page that needs to be included? Please clone this repository, edit [input.txt](https://github.com/koenvo/opensource.pysport.org/blob/main/src/data/input.txt) and create a Pull Request. Once it's merged the package will automaticly be addd.

If you would like to contribute to the code itself (like added support for different languages like Javascript or Julia), please [open a issue](https://github.com/koenvo/opensource.pysport.org/issues/new)

