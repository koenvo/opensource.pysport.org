import Head from 'next/head'
import {useState} from 'react'

const Label = ({title, children}) => {
  return (
    <div className="flex">
      <div className="w-1/2 md:w-5/12">{title}:</div>
      <div className="w-1/2 md:w-7/12 font-medium">{children}</div>
    </div>
  );
};

const Dropdown = () => {
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(state => !state);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={toggle} type="button" className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none" aria-haspopup="true" aria-expanded="true">
          Filters
          <svg className="-smr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {isToggled && <div className="origin-top-left absolute left-0 mt-2 w-56 md:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1 grid grid-cols-1 md:grid-cols-2 pb-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 pt-2">
              <div className="font-bold">Platforms</div>
              <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Python</span>
              </label>
               <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>R</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Julia</span>
              </label>
            </div>

          <div className="px-4 pt-2">
              <div className="font-bold">Sports</div>
              <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>American Football</span>
              </label>
               <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Austrial Football</span>
              </label>
               <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Soccer</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Soccer</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Soccer</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Soccer</span>
              </label>
              <label className="flex cursor-pointer items-center py-1 text-sm text-gray-700 hover:bg-white" role="menuitem">
                <input type="checkbox" className="inline-block mr-2"/>
                <span>Soccer</span>
              </label>
            </div>

        </div>
      </div>}
    </div>
  );
};

const Card = ({}) => {
  return (
    <div className="p-10 m-4 bg-white rounded-lg">
        <div className="sm:flex items-end">
            <img src="https://opensource.pysport.org/img/python.png"
            width="100" height="100" className="mx-auto sm:mx-0" />
            <div className="md:pt-6 md:px-8 text-left space-y-4 h-full">
                <figcaption>
                  <div className="font-bold text-5xl align-middle pt-3">
                    kloppy
                  </div>
                  <div className="text-blue-400 text-xl font-bold pt-3">
                    Python package
                  </div>
                </figcaption>
            </div>
        </div>
        <div className="pt-2 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 text-base">
            <Label title="Sports">Soccer</Label>
            <Label title="Platforms">Python</Label>
            {/*<Label title="Authors">
                <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a> |{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">koenvo</a>
            </Label> */}
            <Label title="License">MIT</Label>
            <Label title="Latest version">1.5.2 <span className="font-thin">(Dec 23, 2020)</span></Label>
            <Label title="Last commit">Dec 23, 2020</Label>
            <Label title="Contributors">3</Label>
          </div>
        </div>
        <blockquote className="pt-2 mt-8 quote text-neutral-600 italic">
        The goal of fcscrapR is to allow R users quick access to the commentary for each soccer game available on ESPN. The commentary data includes basic events such as shot attempts, substitutions, fouls, cards, corners, and video reviews along with information about the players involved. The data can be accessed in-game as ESPN updates their match commentary. This package was created to help get data in the hands of soccer fans to do their own analysis and contribute to reproducible metrics.
        </blockquote>
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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
           <header className="bg-white shadow-md relative">
               <div className="container mx-auto max-w-screen-xl">
                    <div className="mx-4 py-8">
                        <img src="/logo.png" className="w-60"/>
                    </div>
                </div>
                <div className="border-t-2"></div>

            </header>
            <header className="bg-white shadow-md sticky top-0">

                <div className="container mx-auto max-w-screen-xl py-2">
                    <div className="flex justify-between mx-4">
                      <div><Dropdown /></div>
                      <div>
                        <input type="text" className="w-48 md:w-60 border-gray-300 p-2 text-sm focus:text-base font-light border block rounded-md" placeholder="Search"/>
                        </div>


                    </div>
                </div>
            </header>
            <div className="mx-auto p-8 text-center">
              Dev? Sumbit packag here...
            </div>
           <div className="container mx-auto max-w-screen-xl -m-4">
           <div className="grid grid-cols-1 lg:grid-cols-2">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            </div>
            </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}
