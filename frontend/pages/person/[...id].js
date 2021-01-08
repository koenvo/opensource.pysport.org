import { getPersonById } from "../../lib/data";
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from "../../components/layout";
import SubHeader from "../../components/subheader";

export default function Person() {
  const router = useRouter();
  const {id} = router.query;
  if (!id) {
    return null;
  }
  const personId = id[0];
  const entity = getPersonById(personId);

  return (
    <Layout subtitle={entity.name}>
      <SubHeader>
        <div>
          <Link href="/">
            <a
              rel="noopener"
              href="#"
              className="inline-block text-gray-400 py-2 px-4 border border-transparent text-base font-medium rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                   className="h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>

              <span className="ml-2">Back to overview</span>
            </a>
          </Link>
        </div>
      </SubHeader>
      <div className="container mx-auto max-w-screen-xl">
        <div className="mx-4 mt-16">
          <div className="text-3xl">{entity.name}</div>
          <div className="mt-4">{entity.description}</div>
          <div className="mt-4 font-bold">Links</div>
          {!!entity.urls.github && (
            <a href={entity.urls.github} className="block" target="_blank" rel="noopener">Github</a>
          )}
          {!!entity.urls.twitter && (
            <a href={entity.urls.twitter} className="block" target="_blank" rel="noopener">Twitter</a>
          )}
          {!!entity.urls.website && (
            <a href={entity.urls.website} className="blocks" target="_blank" rel="noopener">Website</a>
          )}


          <div className="mt-4">
            <div className="font-bold mb-2">Projects</div>
            {entity.projects.owner.map((project) => {
                return (
                  <div className="font-medium">
                    <Link
                      href={{
                        pathname: `/project/[id]/[name]`,
                        query: {id: project.projectId, name: project.name},
                      }}
                    >
                      <a href="#">
                        {project.name}
                      </a>
                    </Link>
                  </div>
                );
              })
            }
            {entity.projects.contributor
              .filter((project) => entity.projects.owner.indexOf(project) === -1)
              .map((project) => {
                return (
                  <div>
                    <Link
                      href={{
                        pathname: `/project/[id]/[name]`,
                        query: {id: project.projectId, name: project.name},
                      }}
                    >
                      <a href="#">
                        {project.name}
                      </a>
                    </Link>
                  </div>
                );
              })
            }

          </div>
        </div>
      </div>
    </Layout>
  )
};