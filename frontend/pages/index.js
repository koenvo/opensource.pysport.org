import Head from 'next/head'
import {useState} from 'react'

const Label = ({title, children}) => {
  return (
    <div className="flex">
      <div className="w-1/2 md:w-7/12">{title}:</div>
      <div className="w-1/2 md:w-5/12 font-medium">{children}</div>
    </div>
  );
};

const Dropdown = () => {
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(state => !state);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={toggle} type="button" className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none" aria-haspopup="true" aria-expanded="true">
          Filters
          <svg className="-smr-1 ml-2 h-6 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {isToggled && <div className="origin-top-left absolute left-0 mt-2 w-56 md:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1 grid grid-cols-1 md:grid-cols-2 pb-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 pt-2">
              <div className="font-bold">Platforms</div>
              <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Python</span>
              </label>
               <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>R</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Julia</span>
              </label>
            </div>

          <div className="px-4 pt-2">
              <div className="font-bold">Sports</div>
              <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>American Football</span>
              </label>
               <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Austrial Football</span>
              </label>
               <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Soccer</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="cursor-pointer inline-block mr-2"/>
                <span>Soccer</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="cursor-pointer inline-block mr-2"/>
                <span>Soccer</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="cursor-pointer inline-block mr-2"/>
                <span>Soccer</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-base text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="cursor-pointer inline-block mr-2"/>
                <span>Soccer</span>
              </label>
            </div>

        </div>
      </div>}
    </div>
  );
};

const Card = ({language='R', highlight}) => {
  return (
    <div className={`p-6 m-3 bg-white rounded-lg ${highlight ? 'bg-gray-600 text-white sm:flex': ''} relative z-0`}>
        {highlight &&
            <>
                <div className="hidden xl:block absolute transform font-bold -rotate-90 p-1 px-4 -m-4 bg-gray-600 rounded-md -left-12 inset-y-1/2">
                featured
                </div>

                <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/164519901/original/4e908c48177528e9c857029305104a85a1527463/code-python-scripts-and-projects-for-you.png" className="hidden sm:block w-1/2 mr-6" />

            </>

        }
        <div>
        <div className="sm:flex items-end">
            <img src={`https://opensource.pysport.org/img/${language.toLowerCase()}.png`}
            width="100" height="100" className="mx-auto sm:mx-0" />
            <div className="text-center sm:text-left sm:pl-8 text-left space-y-4 h-full">
                <figcaption>
                  <div className="font-bold text-4xl align-middle pt-3">
                    fcscrapR
                  </div>
                  <div className="text-blue-400 text-xl font-bold pt-3">
                    {language} package
                  </div>
                </figcaption>
            </div>
        </div>
            <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/164519901/original/4e908c48177528e9c857029305104a85a1527463/code-python-scripts-and-projects-for-you.png" className="block sm:hidden mt-8 w-full" />

        <div className="pt-2 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
            <Label title="Sports">Soccer</Label>
            <Label title="Language">{language}</Label>
            {/*<Label title="Authors">
                <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a> |{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a>
            </Label> */}
            <Label title="License">MIT</Label>
            <Label title="Latest version">1.5.2</Label>
            <Label title="Last commit">Dec 2020</Label>
            <Label title="Contributors">3</Label>
          </div>
        </div>
        <blockquote className="pt-2 mt-8 text-neutral-600 line-clamp-5 md:line-clamp-3">
        The goal of fcscrapR is to allow R users quick access to the commentary for each soccer game available on ESPN. The commentary data includes basic events such as shot attempts, substitutions, fouls, cards, corners, and video reviews along with information about the players involved. The data can be accessed in-game as ESPN updates their match commentary. This package was created to help get data in the hands of soccer fans to do their own analysis and contribute to reproducible metrics.
        </blockquote>
        <button className="mt-8 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Visit page
        </button>
        </div>
    </div>
  );
};
export default function Home() {
  return (
    <div className="bg-gray-200 h-full">
        <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div,
      div#__next > div > div {
        min-height: 100vh;
      }
    `}</style>

      <Head>
        <title>PySport Opensource overview</title>
        <link rel="icon" href="https://opensource.pysport.org/logo.png" />
      </Head>

      <main>
           <header className="bg-white shadow-md relative">
               <div className="container mx-auto max-w-screen-xl flex">
                    <div className="mx-4 py-8">
                        <a href="/">
                            <img src="/logo.png" className="w-60"/>
                        </a>
                    </div>

                </div>
                <div className="border-t-2"></div>

            </header>
            <header className="bg-white shadow-md sticky top-0 z-10">

                <div className="container mx-auto max-w-screen-xl py-2">
                    <div className="flex justify-between mx-4">
                      <div><Dropdown /></div>
                      <div className="px-2">
                        <input type="text" className="w-40 md:w-60 border-gray-300 p-2 text-base font-light border block rounded-md" placeholder="Search"/>
                        </div>


                    </div>
                </div>
            </header>
            <div className="mx-auto p-8 text-center">
              Dev? Sumbit packag here...
            </div>
           <div className="container mx-auto max-w-screen-xl -m-4">
               <div className="grid grid-cols-1">
                <Card highlight/>
                </div>
                <div className="mx-auto p-8 text-center font-bold text-2xl">
              Visualizations
            </div>
                           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

            <Card language="Python" />
            <Card />
            <Card />
            <Card language="Python" />
            <Card />
            </div>
            <div className="mx-auto p-8 text-center font-bold text-2xl">
              Visualizations
            </div>
                           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

            <Card language="Python" />
            <Card />
            <Card />
            <Card language="Python" />
            <Card />
            </div>
            </div>
      </main>

      <footer className="mt-16 bg-white">
           <div className="container mx-auto max-w-screen-xl py-2">
               <div className="mx-4 py-2">
                <div className="flex justify-around">
                        <a rel="noopener" target="_blank" href="//pysport.org" className="block underline font-medium text-blue-600 hover:text-blue-800 visited:text-purple-600">PySport</a>
                        <a rel="noopener" target="_blank" href="//twitter.com/PySportOrg" className="block underline font-medium text-blue-600 hover:text-blue-800 visited:text-purple-600">Twitter</a>
                        <a rel="noopener" target="_blank" href="//gitcom.com/PySport" className="block underline font-medium text-blue-600 hover:text-blue-800 visited:text-purple-600">Github</a>
                        <a rel="noopener" target="_blank" href="//discord.com/invite/pMZ57FC" className="block underline font-medium text-blue-600 hover:text-blue-800 visited:text-purple-600">Discord</a>
                </div>
           </div>
            </div>
      </footer>
    </div>
  )
}
