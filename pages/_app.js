import '../style/globals.css'
import Head from 'next/head';
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";


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
        <footer className='flex items-center bg-cyan-700 flex-wrap justify-center p-4 md:p-8'>
        <div className='my-5 text-center'>
            <a className='text-2xl text-white hover:text-gray-200 transition duration-500' href="/">Lulu's Sweet World</a>

            <ul className='flex justify-center my-5 gap-5'>
                <li><a className='text-white hover:text-gray-200 transition duration-500' href="/">Accueil</a></li>
                <li><a className='text-white hover:text-gray-200 transition duration-500' href="/peluches">Peluches</a></li>
                <li><a className='text-white hover:text-gray-200 transition duration-500' href="/mode">Mode</a></li>
                <li><a className='text-white hover:text-gray-200 transition duration-500' href="/maison">Maison</a></li>
                <li><a className='text-white hover:text-gray-200 transition duration-500' href="/contact">Contact</a></li>
            </ul>

            <div className='flex justify-center text-center text-2xl my-5 gap-5'>
                <a className='text-white hover:text-gray-200 transition duration-500' href="https://www.messenger.com/t/210061615523190/" target='_blank'><FaInstagram /></a>
                <a className='text-white hover:text-gray-200 transition duration-500' href="https://www.linkedin.com/in/melvyn-hoarau" target='_blank'><FaYoutube /></a>
                <a className='text-white hover:text-gray-200 transition duration-500' href="mailto:melvynhoarau@icloud.com" target='_blank'><FaTiktok /></a>
            </div>

            <div className='text-center'>
                <small className='text-white'>2024 &copy; Tous droits réservés</small>
            </div>
          </div>
        </footer>
        <div id="portal"></div>
        </>
  )
}
