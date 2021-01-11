import projects from '../data/projects.json';
import persons from '../data/persons.json';
import organisations from '../data/organisations.json';


function extendEntities(entityRefs)
{
  const entities = [];

  for(const entityIdRef of entityRefs) {
    let [entityType, entityId] = entityIdRef.split(":");
    entityId = parseInt(entityId);

    let entity;
    switch (entityType)
    {
      case "person":
        entity = persons.find((person) => person.personId === entityId);
        break;
      case "organisation":
        entity = organisations.find((organisation) => organisation.organisationId === entityId);
        break;
      default:
        console.warn(`Could not find ${contributorId}`);
        continue;
    }
    entities.push({
      type: entityType,
      entityIdRef,
      ...entity
    })
  }
  return entities;
}
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
    contributors: extendEntities(project.contributors),
    owners: extendEntities(project.owners)
  };

}

export function getProjects() {
  return projects.map(extendProject);
}

export function getProjectById(projectId) {
  projectId = parseInt(projectId);
  const project = projects.find((project) => project.projectId === projectId);
  if (project) {
    return extendProject(project);
  }
  return null;
}

export function getPersonById(personId) {
  personId = parseInt(personId);
  const person = persons.find((person) => person.personId === personId);
  if (person) {
    return {
      projects: {
        owner: projects.filter((project) => {
          return project.owners.indexOf(`person:${personId}`) !== -1;
        }),
        contributor: projects.filter((project) => {
          return project.contributors.indexOf(`person:${personId}`) !== -1;
        })
      },
      ...person
    }
  }
  return null;
}