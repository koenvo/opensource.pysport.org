import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from "../../components/layout";
import SubHeader from "../../components/subheader";
import { getProjectByName } from "../../lib/data";

const Label = ({title, children}) => {
  return (
    <div className="flex">
      <div className="w-1/2 xl:w-5/12">{title}:</div>
      <div className="w-1/2 xl:w-7/12 font-medium">{children}</div>
    </div>
  );
};

const User = ({user, className}) => {
  return (
    <div>
      <Link
        href={{
          pathname: `/user/[login]`,
          query: {login: user.login},
        }}
      >
        <a
          className={className}>
          {user.name}
        </a>
      </Link>
      <span className="h-4 text-gray-600 inline-block ml-4">
      {!!user.urls.twitter && <a href={user.urls.twitter} target="_blank" rel="noopener">
        <svg version="1.1" id="White" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 400 400" xmlSpace="preserve" fill="currentColor"
             className="h-4 inline-block">
          <path d="M400,200c0,110.5-89.5,200-200,200S0,310.5,0,200S89.5,0,200,0S400,89.5,400,200z M163.4,305.5
	c88.7,0,137.2-73.5,137.2-137.2c0-2.1,0-4.2-0.1-6.2c9.4-6.8,17.6-15.3,24.1-25c-8.6,3.8-17.9,6.4-27.7,7.6
	c10-6,17.6-15.4,21.2-26.7c-9.3,5.5-19.6,9.5-30.6,11.7c-8.8-9.4-21.3-15.2-35.2-15.2c-26.6,0-48.2,21.6-48.2,48.2
	c0,3.8,0.4,7.5,1.3,11c-40.1-2-75.6-21.2-99.4-50.4c-4.1,7.1-6.5,15.4-6.5,24.2c0,16.7,8.5,31.5,21.5,40.1c-7.9-0.2-15.3-2.4-21.8-6
	c0,0.2,0,0.4,0,0.6c0,23.4,16.6,42.8,38.7,47.3c-4,1.1-8.3,1.7-12.7,1.7c-3.1,0-6.1-0.3-9.1-0.9c6.1,19.2,23.9,33.1,45,33.5
	c-16.5,12.9-37.3,20.6-59.9,20.6c-3.9,0-7.7-0.2-11.5-0.7C110.8,297.5,136.2,305.5,163.4,305.5"/>
        </svg>
      </a>
      }
        {!!user.urls.github && <a href={user.urls.github} target="_blank" rel="noopener">

          <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"className="h-4 inline-block ml-1">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)" fill="currentColor" />
          </svg>
        </a>
        }
        {!!user.urls.website && <a href={user.urls.website} target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block h-4 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </a>}
        </span>

    </div>
  )
};

const Contributors = ({project}) => {
  // const owners = project.owners;
  // owners.sort((a, b) => a.name.localeCompare(b.name));

  const contributors = project.contributors;
  //   .filter(
  //   (contributor) => {
  //     return !owners.find((owner) => owner.entityIdRef === contributor.entityIdRef);
  //   }
  // );
  contributors.sort((a, b) => a.name.toLocaleString(b.name));

  return (
    <>
    <div className="mt-2 grid grid-cols-1 md:grid-cols-2">
    {/*{owners.map((owner) => {*/}
      {/*return <Entity entity={owner} className="font-medium" />;*/}
      {/*})}*/}
      {contributors.map((user) => {
        return <User user={user} />;
      })}
    </div>
    </>
  );
};


export default function Project() {
  const router = useRouter();
  const {name} = router.query;
  if (!name) {
    return null;
  }
  const project = getProjectByName(name);

  return (
    <Layout subtitle={project.name}>
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
        <div className="px-2">
          <a
            rel="noopener"
            href={project.url}
            target="_blank"
            className="inline-block py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Visit page
          </a>
        </div>
      </SubHeader>
      <div className="container mx-auto max-w-screen-xl">
        <div className="mx-4 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className="flex">
                <div>
                  <img src={project.logoUrl || `/languages/${project.language.toLowerCase()}.png`}
                       width="100" height="100" className="mx-0 inline-block" style={{width: "120px"}}/>
                </div>
                <div className="text-left pl-8 text-left space-y-4 h-full">
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
                <Label title="Sports">{project.sports.map((sport, k) => {
                  return (
                    <span key={sport}>
                      {k > 0 ? ", " : ""}
                      <Link
                        href={{
                          pathname: `/`,
                          query: {sports: sport},
                        }}
                      >
                        <a
                          className="underline">
                          {sport}
                        </a>
                      </Link>
                      </span>
                  );
                })}</Label>
                <Label title="Language">{project.language}</Label>
                {/*<Label title="Authors">
                 <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a> |{' '}
                 <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a>
                 </Label> */}
                <Label title="License">{project.license}</Label>
                <Label title="Latest version">{project.latestVersion}</Label>
                <Label title="Last commit">{new Date(project.lastCommit.date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric'
                })}</Label>
                <Label title="Category">
                  {project.categories.map((category, k) => {
                    return (
                      <span key={category}>
                      {k > 0 ? ", " : ""}
                      <Link
                        href={{
                          pathname: `/`,
                          query: {categories: category},
                        }}
                      >
                        <a
                          className="underline">
                          {category}
                        </a>
                      </Link>
                      </span>
                    );
                  })}
                </Label>
              </div>
              <div className="mt-4">
                <div className="font-bold">Links</div>
                <div className="grid grid-cols-2">
                {!!project.urls.website && (
                  <a href={project.urls.website} className="block underline hover:text-gray-600" target="_blank" rel="noopener">Website</a>
                )}
                {!!project.urls.docs && (
                  <a href={project.urls.docs} className="block underline hover:text-gray-600" target="_blank" rel="noopener">Documentation</a>
                )}
                {!!project.urls.github && (
                  <a href={project.urls.github} className="block underline hover:text-gray-600" target="_blank" rel="noopener">Github</a>
                )}
                {!!project.urls.pypi && (
                  <a href={project.urls.pypi} className="block underline hover:text-gray-600" target="_blank" rel="noopener">PyPi</a>
                )}
                {!!project.urls.cran && (
                  <a href={project.urls.cran} className="block underline hover:text-gray-600" target="_blank" rel="noopener">CRAN</a>
                )}
                {!!project.urls.twitter && (
                  <a href={project.urls.twitter} className="block underline hover:text-gray-600" target="_blank" rel="noopener">Twitter</a>
                )}
                {!!project.urls.discord && (
                  <a href={project.urls.discord} className="block underline hover:text-gray-600" target="_blank" rel="noopener">Discord</a>
                )}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="font-bold">Description</div>
              <div className="mt-4">
                {project.description}
              </div>
              <div className="mt-4">
                <div className="font-bold">Contributors</div>
                <Contributors project={project} />
              </div>
            </div>
          </div>
        </div>
        {(project.images.length > 0) && (<div className="mx-4 mt-4">
          <div className="font-bold">Images</div>
          <div className="mt-2 h-max">
            <div className="overflow-x-auto snap snap-x snap-mandatory scrollbar max-h-full whitespace-nowrap">
              {project.images.map((image, i) => {
                return (
                  <a href={image.url} target="_blank" rel="noopener" className="mr-2 last:mr-0">
                    <img className="inline-block snap-start w-96" src={image.url} title={image.title} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>)}
      </div>
    </Layout>
  )
};