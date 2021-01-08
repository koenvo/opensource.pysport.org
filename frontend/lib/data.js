const projects = [
  {
    "projectId": 1,
    "name": "kloppy",
    "type": "package",
    "sports": ["Soccer"],
    "license": "BSD 3",
    "language": "Python",
    "description": "Standardizing soccer tracking- and event data",
    "categories": [
      "IO (Reading/Writing)"
    ],

    "latestVersion": "1.5.2",
    "lastCommit": "2021-01-07T08:25:40.420Z",

    "urls": {
      "github": "https://github.com/PySport/kloppy",
      "pypi": "https://pypi.org/project/kloppy/",
      "docs": "https://kloppy.pysport.org",
      "project": ""
    },

    "images": [
      {
        "title": "What does kloppy do?",
        "url": "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/164519901/original/4e908c48177528e9c857029305104a85a1527463/code-python-scripts-and-projects-for-you.png"
      },
      {
        "title": "What does kloppy do?",
        "url": "/images/packages/1-1.png"
      },
      {
        "title": "What does kloppy do?",
        "url": "/images/packages/1-1.png"
      },
      {
        "title": "What does kloppy do?",
        "url": "/images/packages/1-1.png"
      },
      {
        "title": "What does kloppy do?",
        "url": "/images/packages/1-1.png"
      },
      {
        "title": "What does kloppy do?",
        "url": "/images/packages/1-1.png"
      }
    ],

    "contributors": [
      "person:1", "person:2"
    ],
    "owners": [
      "person:1", "person:2"
    ]
  }
];

const persons = [
  {
    "personId": 1,
    "name": "Koen Vossen",
    "imageUrl": "",
    "urls": {
      "github": "https://github.com/koenvo",
      "twitter": "https://twitter.com/mr_le_fox"
    }
  },
  {
    "personId": 2,
    "name": "Bruno Dagnino",
    "imageUrl": "",
    "urls": {
      "github": "https://github.com/bdagnino",
      "twitter": "https://twitter.com/brunodagnino",
      "main": "https://bdagnino.com/"
    }
  }
];

const organisations = [
  {
    "organisationId": 1,
    "name": "DTAI - KU Leuven",
    "imageUrl": "https://dtai.cs.kuleuven.be/sites/dtaid.cs.kuleuven.be/themes/kuleuven/DTAI-logo-henglish-white.png",
    "urls": {
      "github": "https://github.com/orgs/ML-KULeuven",
      "main": "https://dtai.cs.kuleuven.be/ml/"
    },
    "description": "The Machine Learning research group is part of the DTAI section which is part of the Department of Computer Science at the KU Leuven. It is led by Hendrik Blockeel, Jesse Davis and Luc De Raedt and counts about 12 post-docs and 30 PhD students representing virtually all areas of machine learning and data mining. The group focuses on machine learning and data mining research involving structured data, symbolic, logical and probabilistic representations, background knowledge and applies it's techniques to challenging domains in the life sciences and action- and activity learning."
  }
];

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
      ...entity
    })
  }
  return entities;
}
function extendProject(project) {
  const contributors = [];
  const owners = [];

  return {
    ...project,
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
