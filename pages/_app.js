import '../style/globals.css'
import Head from 'next/head';
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import Image from 'next/image';
import wave from '../public/Waveblue.png';
import dotenv from 'dotenv';
import { Analytics } from "@vercel/analytics/react"
dotenv.config();


export const metadata = {
  title: "Lulu's Sweet world",
  description: 'Boutique de crochet 100% fait main !',
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
        <meta name="trustpilot-one-time-domain-verification-id" content="2dbe4708-5fa2-442d-982c-2aa7bd007dc6"/>
        <meta name="description" content="Boutique de crochet 100% fait main." />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Lulu's Sweet World" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Lulu's Sweet World" />
    <meta property="og:description" content="Boutique de crochet 100% fait main." />
    <meta property="og:image" content="https://res.cloudinary.com/dxecll7yj/image/upload/v1722627917/LSW/fbs_gr7ovf.png" />
    <meta property="og:url" content="https://www.lulusweetworld.shop/" />
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="Lulu's Sweet World" />
    <meta property="og:locale" content="fr_FR" />
      </Head>
        <Header />
        <div className='flex-1'>
        <Component {...pageProps} />
          {children}
          <Analytics />
        </div>
        <div className='flex'>
        <Image src={wave} alt="Wave" className=' w-1/4'/>
        <Image src={wave} alt="Wave" className=' w-1/4'/>
        <Image src={wave} alt="Wave" className=' w-1/4'/>
        <Image src={wave} alt="Wave" className=' w-1/4'/>
        </div>
        <footer className='flex items-center bg-gradient-to-t from-custom-purple to-custom-pink flex-wrap justify-center p-4 md:p-8 font-article'>
        <div className='my-5 text-center text-xl md:text-2xl font-chewi'>
            <Link className=' text-white text-4xl hover:underline transition duration-500' href="/">Lulu&apos;s Sweet World</Link>

            <ul className='flex justify-center my-5 gap-5'>
                <li><Link className='text-white hover:underline transition duration-500' href="/">Accueil</Link></li>
                <li><Link className='text-white hover:underline transition duration-500' href="/populaire">Populaire</Link></li>
                <li><Link className='text-white hover:underline transition duration-500' href="/nouveau">Nouveau</Link></li>
                <li><Link className='text-white hover:underline transition duration-500' href="/contact">Contact</Link></li>
            </ul>

            <div className='flex justify-center text-center text-2xl my-5 gap-5'>
                <Link className='text-white hover:underline transition duration-500' href="https://www.instagram.com/lulus_sweet_world/" target='_blank'><FaInstagram /></Link>
                <Link className='text-white hover:underline transition duration-500' href="https://www.youtube.com/@lulussweetworld" target='_blank'><FaYoutube /></Link>
                <Link className='text-white hover:underline transition duration-500' href="https://www.tiktok.com/@lulussweetworld" target='_blank'><FaTiktok /></Link>
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
