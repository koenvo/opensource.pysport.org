import Link from 'next/link'
import { useState } from 'react'
import Layout from "../components/layout";
import SubHeader from "../components/subheader";
import { getProjects } from "../lib/data";
import { useQueryString } from "../lib/use-query-string";


const sportOptions = ["American Football", "Australian Football", "Baseball", "Basketball", "Cricket", "Field Hockey", "Netball", "Ice Hockey", "Soccer", "Tennis"];
const categoryOptions = [
  "Scraper/API",
  "Model/Calculations",
  "IO (Reading/Writing)",
  "Visualization",
  "Open-data",
  "Database"
];

const Label = ({title, children}) => {
  return (
    <div className="flex">
      <div className="w-1/2 md:w-7/12">{title}:</div>
      <div className="w-1/2 md:w-5/12 font-medium">{children}</div>
    </div>
  );
};

const FilterBox = ({title, options, selectedOptions, onSelect}) => {
  return (
    <div className="px-4 pt-2">
    <div className="font-bold">{title}</div>
      {options.map((option) => {
        return (
          <label key={option} className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white"
                 role="menuitem">
            <input type="checkbox"
                   checked={selectedOptions.indexOf(option) !== -1}
                   onChange={(e) => onSelect(e.target.checked, option)}
                   className="inline-block mr-2"/>
            <span>{option}</span>
          </label>
        )
      })}
  </div>
  )
};

const updateList = (add, option, options) => {
  const idx = options.indexOf(option);
  const optionsNew = options.slice();
    if (add) {
      if (idx === -1) {
        optionsNew.push(option);
      }
    } else {
      if (idx !== -1) {
        optionsNew.splice(idx, 1);
      }
    }
    return optionsNew;
};

const Dropdown = ({languages, setLanguages, sports, setSports, categories, setCategories}) => {
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(state => !state);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={toggle} type="button"
                className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none"
                aria-haspopup="true" aria-expanded="true">
          Filters
          <svg className="-smr-1 ml-2 h-6 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
               fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"/>
          </svg>
        </button>
      </div>
      {isToggled && <div
        className="origin-top-left absolute left-0 mt-2 w-56 md:w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1 grid grid-cols-1 md:grid-cols-3 pb-2" role="menu" aria-orientation="vertical"
             aria-labelledby="options-menu">
          <FilterBox
            title="Languages"
            options={["Haskell", "Python", "R", "Other"]}
            selectedOptions={languages}
            onSelect={(add, option) => setLanguages(updateList(add, option, languages))}
          />
          <FilterBox
            title="Sports"
            options={sportOptions}
            selectedOptions={sports}
            onSelect={(add, option) => setSports(updateList(add, option, sports))}
          />
          <FilterBox
            title="Category"
            options={categoryOptions}
            selectedOptions={categories}
            onSelect={(add, option) => setCategories(updateList(add, option, categories))}
          />

        </div>
      </div>}
    </div>
  );
};

const Card = ({project, highlight}) => {
  const logoUrl = project.logoUrl || `/languages/${project.language.toLowerCase()}.png`;
  const hasLogo = !!project.logoUrl || project.language !== 'Other';

  let type = 'project';
  switch (project.type)
  {
    case 'package':
      if (project.language === 'Python') {
        type = 'package';
      } else {
        type = 'package';
      }
      break;
    case 'github_package':
      type = 'package';
      break;
    default:
      type = project.type;

  }
  return (
    <div
      className={`p-6 m-3 bg-white rounded-lg ${highlight ? 'ring-4 ring-indigo-300 sm:grid sm:grid-cols-2 sm:gap-8' : ''} relative z-0`}>
      {highlight &&
      <>
      <div
        className="hidden xl:block absolute text-white bg-indigo-300 rounded-md font-bold xl:transform xl:-rotate-90 p-1 px-5 xl:-m-4 xl:-left-14 xl:inset-y-1/2">
        featured
      </div>

      {/*<div
       className="absolute text-white bg-indigo-300 rounded-md font-bold p-1 text-center px-4 w-28 -mx-16 -my-6 inset-x-1/2">
       featured
       </div>*/}

      <div className="hidden sm:block">
        <img src={project.images[0].url}/>
      </div>

      </>

      }
      <div>
        <Link
          href={{
            pathname: '/project/[name]',
            query: {name: project.name},
          }}
        ><a className="sm:flex block">
          {hasLogo && <div>
            <img src={logoUrl}
                 width="100" height="100" className="mx-auto sm:mx-0" style={{width: "100px"}}/>
          </div>}
          <div className={`text-center sm:text-left ${hasLogo ? 'sm:pl-8' : ''} text-left space-y-4 h-full`}>
            <figcaption>
              <div className="font-bold text-4xl align-middle pt-3 whitespace-nowrap">
                {project.name.length > 12 ? project.name.substring(0, 11) + '..' : project.name}
              </div>
              <div className="text-blue-400 text-xl font-bold pt-3">
                {project.language} {type}
              </div>
            </figcaption>
          </div>
        </a>
        </Link>
        {highlight &&
        <img
          src={project.images[0].url}
          className="block sm:hidden mt-8 w-full"/>
        }

        <div className="pt-2 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
            <Label title="Sports">{project.sports.join(", ")}</Label>
            <Label title="Language">{project.language}</Label>
            {/*<Label title="Authors">
             <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a> |{' '}
             <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a>
             </Label> */}
            <Label title="License">{(project.license || '').substring(0, 10)}</Label>
            <Label title="Latest version">{project.latestVersion}</Label>
            <Label title="Last commit">{new Date(project.lastCommit.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            })}</Label>
            <Label title="Contributors">{project.contributors.length}</Label>
          </div>
        </div>
        <blockquote className="pt-2 mt-8 text-neutral-600 line-clamp-5 md:line-clamp-3">
          {project.description}
        </blockquote>
        <Link
          href={{
            pathname: '/project/[name]',
            query: {name: project.name},
          }}
        >
          <a
            className="mt-8 inline-block py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Details
          </a>
        </Link>
      </div>
    </div>
  );
};

const Overview = ({projects, categories}) => {
  return categories.map((category) => {
    const categoryProjects = projects.filter((project) => {
      return (
        project.categories.indexOf(category) !== -1
        || (
          category === 'Other' &&
            project.categories.length === 0
        )
      );
    });
    if (categoryProjects.length === 0) {
      return null;
    }
    return (
      <div key={category}>
        <a name={category} className="-mt-16 absolute"/>
        <div className="mx-auto p-8 text-center font-bold text-2xl">
          <a href={`#${category}`}>
          {category} ({categoryProjects.length})
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {categoryProjects.map((project) => <Card key={project.name} project={project}/>)}
        </div>
      </div>
    )
  });
};


export default function Home() {
  const [searchValue, setSearchValue] = useQueryString("search");
  let [languages, setLanguages] = useQueryString("languages", ['R', 'Python', "Haskell", "Other"]);
  let [categories, setCategories] = useQueryString("categories", categoryOptions);
  let [sports, setSports] = useQueryString("sports", sportOptions);

  categories = Array.isArray(categories) ? categories : [categories];
  languages = Array.isArray(languages) ? languages : [languages];
  sports = Array.isArray(sports) ? sports : [sports];

  const isFiltering = (
    !!searchValue ||
      languages.length !== 4 ||
      sports.length !== sportOptions.length ||
      categories.length !== categoryOptions.length
  );

  const projects = getProjects();
  const filteredProjects = projects.filter(
    (project) => {
      return (
        languages.indexOf(project.language) !== -1 &&
        sports.indexOf(project.sports[0]) !== -1 &&
        project.categories.filter(cat => categories.indexOf(cat) !== -1).length > 0 &&
        (!searchValue || JSON.stringify(project).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
      );
    }
  );

  return (
    <Layout>
      <SubHeader>
        <div>
          <Dropdown
            languages={languages}
            setLanguages={setLanguages}
            sports={sports}
            setSports={setSports}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
        <div className="px-2">
          <input type="text"
                 className="w-40 md:w-60 border-gray-300 p-2 text-base font-light border block rounded-md"
                 value={searchValue || ""}
                 onChange={(e) => setSearchValue(e.target.value)}
                 placeholder="Search"/>
        </div>
      </SubHeader>
      <div className="mx-auto p-8 text-center">
        Developer? <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeZkIZjZxxek6D4Ec05V1EBrGBg2H-0lNosBijt1MeJIaAJGA/viewform"
        rel="noopener"
        target="_blank"
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      >
        Submit your package here
      </a>
      </div>
      <div className="container mx-auto max-w-screen-xl -m-4">
        {!isFiltering && <div className="grid grid-cols-1">
          <Card highlight project={projects[85]}/>
        </div>}
        <Overview projects={filteredProjects} categories={categories} />
        {(filteredProjects.length === 0) && <div className="mx-auto p-8 text-center text-2xl">No matches found</div>}
      </div>
    </Layout>
  )
};

Home.getInitialProps = ({query}) => {
  return {query};
};
