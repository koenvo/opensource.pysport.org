import Head from 'next/head'

const Label = ({title, children}) => {
  return (
    <div className="flex">
      <div className="w-1/2 md:w-2/5">{title}:</div>
      <div className="w-1/2 md:w-3/5 font-medium">{children}</div>
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
                  <div class="font-bold text-4xl align-middle pt-3">
                    kloppy
                  </div>
                  <div class="text-blue-400 text-xl font-bold pt-3">
                    IO Python package
                  </div>
                </figcaption>
            </div>
        </div>
        <div className="pt-2 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Label title="Sports">Soccer</Label>
            <Label title="Platforms">Python</Label>
            <Label title="Author">koenvo</Label>
            <Label title="License">MIT</Label>
          </div>
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
