import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from "../../components/layout";
import SubHeader from "../../components/subheader";
import { getProjectById } from "../../lib/data";

const Label = ({title, children}) => {
  return (
    <div className="flex">
      <div className="w-1/2 xl:w-5/12">{title}:</div>
      <div className="w-1/2 xl:w-7/12 font-medium">{children}</div>
    </div>
  );
};



export default function Project() {
    const router = useRouter();
    const { id } = router.query;
    if (!id) {
      return null;
    }
    const projectId = id[0];
    const project = getProjectById(projectId);

  const goBack = (e) => {
      if (window.history.length > 2) {
        e.preventDefault();
        router.back();
      }
  };
  return (
    <Layout>
      <SubHeader>
        <div>
          <Link href="/">
            <a
            rel="noopener"
            href="#"
            onClick={goBack}
            className="inline-block text-gray-400 py-2 px-4 border border-transparent text-base font-medium rounded-md flex items-center">
            <svg version="1.1" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="transform rotate-180 h-4 inline-block fill-current">
              <g transform="translate(-10, -10)">
                <path d="m12.5 45.832h64.582v8.332h-64.582z"/>
                <path d="m59.168 77.918l-5.8359-5.8359 22.086-22.082-22.086-22.082 5.8359-5.8359 27.914 27.918z"/>
              </g>
            </svg>
            <span className="ml-2">Back to overview</span>
          </a>
          </Link>
        </div>
        <div className="px-2">
          <a
          rel="noopener"
          href="#"
          target="_blank"
          className="inline-block py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Visit page
        </a>
        </div>
      </SubHeader>
      <div className="container mx-auto max-w-screen-xl">
        <div className="mx-4 mt-16">
          <div className="grid grid-cols-2">
            <div>
              <div className="flex">
                <img src={`https://opensource.pysport.org/img/${project.language.toLowerCase()}.png`}
                     width="100" height="100" className="mx-auto sm:mx-0"/>
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
                <Label title="Sports">Soccer</Label>
                <Label title="Language">{project.language}</Label>
                {/*<Label title="Authors">
                 <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a> |{' '}
                 <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a>
                 </Label> */}
                <Label title="License">{project.license}</Label>
                <Label title="Latest version">{project.latestVersion}</Label>
                <Label title="Last commit">{new Date(project.lastCommit).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}</Label>
                <Label title="Contributors">{project.contributors.length}</Label>
              </div>
            </div>
            <div>
              <div className="font-bold">Description</div>
              <div className="mt-4">
                {project.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};