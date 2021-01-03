import Head from 'next/head'

const Label = ({title, children}) => {
  return (
    <div className="flex">
      <div className="w-1/2 md:w-5/12">{title}:</div>
      <div className="w-1/2 md:w-7/12 font-medium">{children}</div>
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
                  <div class="font-bold text-5xl align-middle pt-3">
                    kloppy
                  </div>
                  <div class="text-blue-400 text-xl font-bold pt-3">
                    IO Python package
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
           <header className="bg-white shadow-md">
               <div className="container mx-auto max-w-screen-xl">
                    <div className="mx-4 py-8">
                        <img src="/logo.png" className="w-60"/>
                    </div>
                </div>
                <div className="border-t-2"></div>
                <div className="container mx-auto max-w-screen-xl">
                    <div className="mx-4 py-4">adasd</div>
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
