import projects from '../data/projects.json';
import users from '../data/users.json';


function extendProject(project) {
  const contributors = [];
  const owners = [];
  let url = '#';
  for(const type of ["website", "docs", "github", "pypi", "cran"]) {
    if (!!project.urls[type]) {
      url = project.urls[type];
      break;
    }
  }

  return {
    ...project,
    url,
    contributors: users.filter((user) => project.contributors.indexOf(user.login) !== -1),
    owners: []
  };

}

export function getProjects() {
  return projects.map(extendProject);
}

export function getProjectByName(name) {
  const project = projects.find((project) => project.name === name);
  if (project) {
    return extendProject(project);
  }
  return null;
}

export function getUserByLogin(login) {
  const user = users.find((user) => user.login === login);
  if (user) {
    return {
      projects: {
        owner: [],
        contributor: projects.filter((project) => {
          return project.contributors.indexOf(login) !== -1;
        })
      },
      ...user
    }
  }
  return null;
}