import { getUserByLogin } from "../../lib/data";
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from "../../components/layout";
import SubHeader from "../../components/subheader";

export default function Person() {
  const router = useRouter();
  const {login} = router.query;
  if (!login) {
    return null;
  }
  const user = getUserByLogin(login);

  return (
    <Layout subtitle={user.name}>
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
          <div className="text-3xl">{user.name}</div>
          <div className="mt-4">{user.description}</div>
          <div className="mt-4 font-bold">Links</div>
          {!!user.urls.github && (
            <a href={user.urls.github} className="block" target="_blank" rel="noopener">Github</a>
          )}
          {!!user.urls.twitter && (
            <a href={user.urls.twitter} className="block" target="_blank" rel="noopener">Twitter</a>
          )}
          {!!user.urls.website && (
            <a href={user.urls.website} className="blocks" target="_blank" rel="noopener">Website</a>
          )}


          <div className="mt-4">
            <div className="font-bold mb-2">Projects</div>
            {user.projects.contributor
              .map((project) => {
                return (
                  <div>
                    <Link
                      href={{
                        pathname: `/project/[name]`,
                        query: {name: project.name},
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