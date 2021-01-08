const projects = [
  {
    "projectId": 1,
    "name": "nflfastR",
    "type": "package",
    "sports": ["American Football"],
    "license": "MIT",
    "language": "R",
    "logoUrl": "https://raw.githubusercontent.com/mrcaseb/nflfastR/master/man/figures/logo.png",
    "description": "nflfastR is a set of functions to efficiently scrape NFL play-by-play data",
    "categories": [
      "Scraper/API"
    ],

    "latestVersion": "v3.2.0",
    "lastCommit": "2021-01-07T08:25:40.420Z",

    "urls": {
      "github": "https://github.com/mrcaseb/nflfastR",
      "cran": "https://cran.r-project.org/web/packages/nflfastR/index.html",
      "website": "https://www.nflfastr.com/",
      "discord": "https://discord.gg/5Er2FBnnQa"
    },

    "images": [
      {
        "title": "What does kloppy do?",
        "url": "https://github.com/mrcaseb/nflfastR/raw/master/man/figures/readme-cp-model-1.png"
      }
    ],

    "owners": [
      "person:1", "person:2", "organisation:1"
    ],
    "contributors": [
      "person:1", "person:2", "person:3"
    ]
  },
  {
    "projectId": 2,
    "name": "kloppy",
    "type": "package",
    "sports": ["Soccer"],
    "license": "BSD 3",
    "language": "Python",
    "description": "kloppy is a Python package providing (de)serializers for soccer tracking- and event data, standardized data models, filters, and transformers designed to make working with different tracking- and event data like a breeze. It aims to be the fundamental building blocks for loading, filtering and tranforming tracking- and event data.",
    "categories": [
      "IO (Reading/Writing)"
    ],

    "latestVersion": "1.5.2",
    "lastCommit": "2021-01-07T08:25:40.420Z",

    "urls": {
      "github": "https://github.com/PySport/kloppy",
      "pypi": "https://pypi.org/project/kloppy/",
      "docs": "https://kloppy.pysport.org",
    },

    "images": [
      {
        "title": "What does kloppy do?",
        "url": "/images/packages/1-1.png"
      },
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
      }
    ],

    "owners": [
      "person:1", "person:2", "organisation:1"
    ],
    "contributors": [
      "person:1", "person:2", "person:3",
      "person:3", "person:3", "person:3", "person:3", "person:3", "person:3", "person:3", "person:3", "person:3", "person:3",
    ]
  }
];

const persons = [
  {
    "personId": 1,
    "name": "Koen Vossen",
    "description": "Founder TeamTV / PyData Eindhoven committee member / Founder PySport / Instructor KNKV",
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
      "website": "https://bdagnino.com/"
    }
  },
  {
    "personId": 3,
    "name": "Bruno Dagnino",
    "imageUrl": "",
    "urls": {
      "github": "https://github.com/bdagnino",
      "twitter": "https://twitter.com/brunodagnino",
      "website": "https://bdagnino.com/"
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
      "website": "https://dtai.cs.kuleuven.be/ml/"
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