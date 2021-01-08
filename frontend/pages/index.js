import Link from 'next/link'
import { useState } from 'react'
import Layout from "../components/layout";
import SubHeader from "../components/subheader";
import { getProjects } from "../lib/data";
import { useQueryString } from "../lib/use-query-string";

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
                   onSelect={(e) => onSelect(option, e.target.value)}
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
    if (add) {
      if (idx === -1) {
        options.push(option);
      }
    } else {
      if (idx !== -1) {
        options.splice(idx, 1);
      }
    }
    return options;
};

const Dropdown = ({languages, setLanguages}) => {
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
        className="origin-top-left absolute left-0 mt-2 w-56 md:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1 grid grid-cols-1 md:grid-cols-2 pb-2" role="menu" aria-orientation="vertical"
             aria-labelledby="options-menu">
          <FilterBox
            title="Languages"
            options={["Python", "R"]}
            selectedOptions={languages}
            onSelect={(add, option) => setLanguages(updateList(add, option))}
          />
          <FilterBox
            title="Sports"
            options={["American Football", "Austrial Football", "Baseball", "Basketball", "Cricket", "Field Hockey", "Ice Hockey", "Soccer", "Tennis"]}
            selectedOptions={[]}
          />

        </div>
      </div>}
    </div>
  );
};

const Card = ({project, highlight}) => {
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
            pathname: '/project/[id]/[name]',
            query: {id: project.projectId, name: project.name},
          }}
        ><a className="sm:flex block">
          <div>
            <img src={project.logoUrl || `https://opensource.pysport.org/img/${project.language.toLowerCase()}.png`}
                 width="100" height="100" className="mx-auto sm:mx-0" style={{width: "100px"}}/>
          </div>
          <div className="text-center sm:text-left sm:pl-8 text-left space-y-4 h-full">
            <figcaption>
              <div className="font-bold text-4xl align-middle pt-3">
                {project.name}
              </div>
              <div className="text-blue-400 text-xl font-bold pt-3">
                {project.language} package
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
            <Label title="License">{project.license}</Label>
            <Label title="Latest version">{project.latestVersion}</Label>
            <Label title="Last commit">{new Date(project.lastCommit).toLocaleDateString('en-US', {
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
            pathname: '/project/[id]/[name]',
            query: {id: project.projectId, name: project.name},
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

const Overview = ({projects}) => {
  const categories = [
    "Scraper/API",
    "Model/Calculations",
    "IO (Reading/Writing)",
    "Visualization",
    "Gambling",
    "Other"
  ];

  return categories.map((category) => {
    const categoryProjects = projects.filter((project) => project.categories.indexOf(category) !== -1);
    if (categoryProjects.length === 0) {
      return null;
    }
    return (
      <cat key={category}>
        <div className="mx-auto p-8 text-center font-bold text-2xl">
          {category}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {categoryProjects.map((project) => <Card key={project.projectId} project={project}/>)}
        </div>
      </cat>
    )
  });
};


export default function Home() {
  const [searchValue, setSearchValue] = useQueryString("search");
  const [languages, setLanguages] = useQueryString("languages", ['R', 'Python']);

  const projects = getProjects();
  return (
    <Layout>
      <SubHeader>
        <div>
          <Dropdown
            languages={languages || []}
            setLanguages={setLanguages}
          />
        </div>
        <div className="px-2">
          <input type="text"
                 className="w-40 md:w-60 border-gray-300 p-2 text-base font-light border block rounded-md"
                 value={searchValue}
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
        <div className="grid grid-cols-1">
          <Card highlight project={projects[0]}/>
        </div>
        <Overview projects={projects}/>
      </div>
    </Layout>
  )
}
