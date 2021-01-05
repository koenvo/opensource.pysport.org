import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div className="bg-gray-200 h-full flex flex-col">
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
        <link rel="icon" href="favicon.png"/>
      </Head>
      <header className="bg-white shadow-md relative">
        <div className="container mx-auto max-w-screen-xl flex">
          <div className="mx-4 py-8">
            <a href="/">
              <img src="/logo.png" className="w-60"/>
            </a>
          </div>

        </div>
        <div className="border-t-2" />
      </header>
      <main className="flex-grow">
        {children}
      </main>

      <footer className="mt-16 bg-white b-0">
        <div className="container mx-auto max-w-screen-xl py-2">
          <div className="mx-4 py-2">
            <div className="flex justify-around">
              <a rel="noopener" target="_blank" href="//pysport.org"
                 className="block underline font-medium text-blue-600 hover:text-blue-800 visited:text-purple-600">PySport</a>
              <a rel="noopener" target="_blank" href="//twitter.com/PySportOrg"
                 className="block underline font-medium text-blue-600 hover:text-blue-800 visited:text-purple-600">Twitter</a>
              <a rel="noopener" target="_blank" href="//gitcom.com/PySport"
                 className="block underline font-medium text-blue-600 hover:text-blue-800 visited:text-purple-600">Github</a>
              <a rel="noopener" target="_blank" href="//discord.com/invite/pMZ57FC"
                 className="block underline font-medium text-blue-600 hover:text-blue-800 visited:text-purple-600">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}