'use client'
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'tailwindcss/tailwind.css';
import Slider from 'react-slick';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';
import { PiFlowerFill } from "react-icons/pi";
import mathilde from '../public/mathilde.png';
import i1 from '../public/1.webp';
import i2 from '../public/2.webp';
import i3 from '../public/3.webp';
import i4 from '../public/4.webp';
import i5 from '../public/5.webp';
import i6 from '../public/6.webp';
import i7 from '../public/7.webp';
import i8 from '../public/8.webp';
import h1 from '../public/how-it-works-1.png.webp';
import h2 from '../public/how-it-works-2.png.webp';
import h3 from '../public/how-it-works-3.png.webp';
import h4 from '../public/how-it-works-4.png.webp';
import { BsInstagram } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const settings = {
    arrows: false, 
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    customPaging: (i) => (
      <PiFlowerFill
        className={`text-2xl ${currentSlide === i ? 'text-red-300' : 'text-red-200'}`}
      />
    ),
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <IoIosArrowDroprightCircle
        className={className}
        style={{ ...style, marginRight: "7rem", zIndex: "", display: "block",fontSize: "", background: "transparent", color: "#517e94"}}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <IoIosArrowDropleftCircle
        className={className}
        style={{ ...style, marginLeft: "7rem", zIndex: "1", display: "block", background: "transparent", color: "#517e94"}}
        onClick={onClick}
      />
    );
  }

  const settings2 = {
    className: "center",
    centerMode: true,
    centerPadding: "100px",
    arrows: true, 
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3, // Ajustement ici pour afficher 1 seul slide sur mobile
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    beforeChange: (current, next) => setCurrentSlide2(next),
  };

  return (
    <div>
      <main className='bg-white'>

<section>
  <Slider {...settings}>
    <div className='flex relative'>
      <div className='mx-auto'>
        <div className='flex'>
          <Image src={i1} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i2} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i3} alt="Homepage 1" className='w-0 lg:w-1/4'/>
          <Image src={i4} alt="Homepage 1" className='w-0 lg:w-1/4'/>
        </div>
        <div className='absolute bg-opacity-90 bg-white left-1/2  -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 p-2'>
          <div className='flex flex-col items-center justify-around border-2 border-black h-full'>
            <h1 className='text-sm lg:text-2xl text-gray-500'>NOUVEAUX ARTICLES</h1>
            <div className='text-center'>
              <p className='text-3xl font-LovelyValentine lg:text-6xl lg:mx-32 lg:px-0'>La collection speciale Saint Valentin est la !</p>
              <hr className='w-2/3 border-black mx-auto' />
            </div>
            <a href="#" className='bg-517e94 text-white px-4 py-2 rounded-3xl hover:bg-b0e7f5 transition duration-300 ease-in-out'>Voir la collection</a>
          </div>
        </div>
        <div className='flex'>
          <Image src={i5} alt="Homepage 1" className='w-1/2 lg:w-1/4 rounded-se-md'/>
          <Image src={i6} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i7} alt="Homepage 1" className='w-0 lg:w-1/4'/>
          <Image src={i8} alt="Homepage 1" className='w-0 lg:w-1/4'/>          
        </div>
      </div>
    </div>
    <div className='flex relative'>
      <div className='mx-auto'>
        <div className='flex'>
          <Image src={i1} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i2} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i3} alt="Homepage 1" className='w-0 lg:w-1/4'/>
          <Image src={i4} alt="Homepage 1" className='w-0 lg:w-1/4'/>
        </div>
        <div className='absolute bg-opacity-90 bg-white left-1/2  -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 p-2'>
          <div className='flex flex-col items-center justify-around border-2 border-black h-full'>
            <h1 className='text-sm lg:text-2xl text-gray-500'>NOUVEAUX ARTICLES</h1>
            <div className='text-center'>
              <p className='text-3xl font-LovelyValentine lg:text-6xl lg:mx-32 lg:px-0'>La collection speciale Saint Valentin est la !</p>
              <hr className='w-2/3 border-black mx-auto' />
            </div>
            <a href="#" className='bg-517e94 text-white px-4 py-2 rounded-3xl hover:bg-b0e7f5 transition duration-300 ease-in-out'>Voir la collection</a>
          </div>
        </div>
        <div className='flex'>
          <Image src={i5} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i6} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i7} alt="Homepage 1" className='w-0 lg:w-1/4'/>
          <Image src={i8} alt="Homepage 1" className='w-0 lg:w-1/4'/>
        </div>
      </div>
    </div>
    <div className='flex relative'>
      <div className='mx-auto'>
        <div className='flex'>
          <Image src={i1} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i2} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i3} alt="Homepage 1" className='w-0 lg:w-1/4'/>
          <Image src={i4} alt="Homepage 1" className='w-0 lg:w-1/4'/>
        </div>
        <div className='absolute bg-opacity-90 bg-white left-1/2  -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 p-2'>
          <div className='flex flex-col items-center justify-around border-2 border-black h-full'>
            <h1 className='text-sm lg:text-2xl text-gray-500'>NOUVEAUX ARTICLES</h1>
            <div className='text-center'>
              <p className='text-3xl font-LovelyValentine lg:text-6xl lg:mx-32 lg:px-0'>La collection speciale Saint Valentin est la !</p>
              <hr className='w-2/3 border-black mx-auto' />
            </div>
            <a href="#" className='bg-517e94 text-white px-4 py-2 rounded-3xl hover:bg-b0e7f5 transition duration-300 ease-in-out'>Voir la collection</a>
          </div>
        </div>
        <div className='flex'>
          <Image src={i5} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i6} alt="Homepage 1" className='w-1/2 lg:w-1/4'/>
          <Image src={i7} alt="Homepage 1" className='w-0 lg:w-1/4'/>
          <Image src={i8} alt="Homepage 1" className='w-0 lg:w-1/4'/>
        </div>
      </div>
    </div>
  </Slider>
</section>
        
        <section className='mt-20 pt-10 pb-5'>
          <div className='-rotate-[5deg] flex lg:absolute justify-center mx-20'>
            <div className=' justify-center p-2 pb-3 bg-red-200'>
              <Image
                src={mathilde}
                width={330}
              />
              <div>
                <p className='flex justify-center pt-2 text-gray-700 text-xl font-LovelyValentine'>Lucile, creatrice de Lulu's Sweet World</p>
              </div>
            </div>
          </div>
          <div className='lg:w-2/3 mx-8 md:mx-72 lg:ml-96 my-10 lg:my-0'>
            <div className='border-dashed border-4 border-gray-700 py-10 px-10 lg:px-20 text-xl font-article rounded-3xl'>
            <p className='text-5xl text-gray-800'>Bienvenue !</p>
            <br />
            <p className='text-gray-700'>Je suis Mathilde, 19 ans, créatrice passionnée de peluches et d'accessoires au crochet. Depuis mon enfance, je transforme des fils de laine en pièces uniques et charmantes. En lançant mon entreprise indépendante, je mets en avant mon style et ma passion pour l'artisanat fait main. Chaque création que je réalise reflète ma créativité et mon amour pour le crochet. qjenfi inzjenf iuzefj nziue nfiuzenf inzeifun ziufn iuzenf iuz jnzjenfiu fnize nizeufn ziuenf  zjenfi znefu ne nzinfzi unfiuerf zioenjfoi zufn iuzr</p>
            </div>
            <div className='flex pt-7 justify-center gap-10'>
              <a href="https://www.instagram.com/lulus_sweet_world/" target='#blank' className="mt-4 text-3xl text-white flex items-center justify-center w-12 h-12 bg-517e94 hover:bg-b0e7f5 transition duration-500 rounded-full"><BsInstagram /></a>
              <a href="https://www.tiktok.com/@lulussweetworld" target='#blank' className="mt-4 text-3xl text-white flex items-center justify-center w-12 h-12 bg-517e94 hover:bg-b0e7f5 transition duration-500 rounded-full"><FaTiktok /></a>
              <a href="#" className="mt-4 text-3xl text-white flex items-center justify-center w-12 h-12 bg-517e94 hover:bg-b0e7f5 transition duration-500 rounded-full"><FaFacebookF /></a>
            </div>
          </div>
        </section>

        <section className='pt-10 lg:pt-20'>
          <h1 className='flex justify-center text-7xl text-cyan-700 font-logo'>Les plus populaires</h1>

          <Slider {...settings2} className=''>
  <div className=''>
    <div className='mx-2 lg:mx-10'>
      <div className={`pt-10 transform ${currentSlide2 === 0 ? 'scale-110 transition-transform' : 'scale-100 transition-transform'}`}>
        <Image src={i1} alt="Image 1" className='py-10'/>
      </div>
    </div>
  </div>
  <div className='flex justify-around '>
    <div className='mx-2 lg:mx-10'>
      <div className={`pt-10 transform ${currentSlide2 === 1 ? 'scale-110 transition-transform' : 'scale-100 transition-transform'}`}>
        <Image src={i2} alt="Image 2" className='py-10'/>
      </div>
    </div>
  </div>
  <div className='flex justify-around  '>
    <div className='mx-2 lg:mx-10'>
      <div className={`pt-10 transform ${currentSlide2 === 2 ? 'scale-110 transition-transform' : 'scale-100 transition-transform'}`}>
        <Image src={i3} alt="Image 3" className='py-10'/>
      </div>
    </div>
  </div>
  <div className='flex justify-around '>
    <div className='mx-2 lg:mx-10'>
      <div className={`pt-10 transform ${currentSlide2 === 3 ? 'scale-110 transition-transform' : 'scale-100 transition-transform'}`}>
        <Image src={i4} alt="Image 4" className='py-10'/>
      </div>
    </div>
  </div>
</Slider>
    </section>

        <section className='px-5 lg:px-20'>

<div className='lg:px-20 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 my-10'>

    <div className=' lg:flex lg:flex-col justify-center'>
      <div className='flex justify-around'>
        <Image src={h1}/>
      </div>
      <h1 className='flex pt-2 justify-center text-2xl mb-2 font-article text-gray-600 text-center'>Choisis ta peluche</h1>
    </div>

    <div className='lg:flex lg:flex-col justify-center'>
      <div className='flex justify-around'>
        <Image src={h2}/>
      </div>
      <h1 className='flex pt-2 justify-center text-2xl mb-2 font-article text-gray-600 text-center	'>Je la fais avec amour</h1>
    </div>

    <div className='lg:flex lg:flex-col justify-center'>
      <div className='flex justify-around'>
        <Image src={h3}/>
      </div>
      <h1 className='flex pt-2 justify-center text-2xl mb-2 font-article text-gray-600 text-center	'>Je te l'envoie</h1>
    </div>

    <div className='lg:flex lg:flex-col justify-center'>
      <div className='flex justify-around'>
        <Image src={h4}/>
      </div>
      <h1 className='flex pt-2 justify-center text-2xl mb-2 font-article text-gray-600 text-center'>Tu la câlines !</h1>
    </div>

</div>

</section>

      </main>
    </div>
  )
}