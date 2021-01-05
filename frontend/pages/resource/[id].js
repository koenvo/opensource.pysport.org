import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from "../../components/layout";
import SubHeader from "../../components/subheader";



export default function Resource() {
    const router = useRouter()
    const { id } = router.query

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
      <div>piet: {id}</div>
    </Layout>
  )
};