import '../style/globals.css'
import Head from 'next/head';


export const metadata = {
  title: "Lulu's Sweet world",
  description: 'Boutique de crochet 100% fait main.',
}

import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from '../app/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, Component, pageProps }) {

  return (
    <>  
        <Head>
        <title>Lulus Sweet World</title>
        <meta name="description" content="Boutique de crochet 100% fait main." />
      </Head>
        <Header />
        <div className='flex-1'>
        <Component {...pageProps} />
          {children}
        </div>
        <footer className='flex items-center flex-wrap justify-center border-t border-solid border-slate-300 p-4 md:p-8'>
          <Link href={'https://www.instagram.com/smoljames'} target="_blank">
            <i className="fa-brands fa-instagram text-slate-700 hover:text-slate-500 cursor-pointer text-2xl sm:text-3xl md:text-4xl"></i>
          </Link>
        </footer>
        <div id="portal"></div>
        </>
  )
}
