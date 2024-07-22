import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { PiFlowerFill } from "react-icons/pi";
import i1 from '../../public/1.webp';
import i2 from '../../public/2.webp';
import i3 from '../../public/3.webp';
import i4 from '../../public/4.webp';
import i5 from '../../public/5.webp';
import i6 from '../../public/6.webp';
import i7 from '../../public/7.webp';
import i8 from '../../public/8.webp';
import free from '../../public/free.png';
import freem from '../../public/freem.png';
import rs from '../../public/rs.png';
import rsm from '../../public/rsm.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Caroussel = ({ currentSlide, setCurrentSlide }) => {
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

  return (
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
        <div className='absolute bg-opacity-90 bg-white left-1/2  -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 p-2 scale-75'>
          <div className='flex flex-col items-center justify-around border-2 border-black h-full'>
            <h1 className='text-sm lg:text-2xl text-gray-500'>NOUVEAUX ARTICLES</h1>
            <div className='text-center'>
            <p className='text-4xl font-dense lg:text-8xl lg:mx-20 pb-2 lg:px-0'>Bienvenue sur ma boutique !</p>
              <hr className='w-2/3 border-black mx-auto' />
            </div>
            <a href="https://www.lulusweetworld.shop/populaire" className='bg-517e94 px-4 py-2 rounded-3xl hover:bg-b0e7f5 transition duration-300 ease-in-out font-article'>Voir la collection</a>
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
      <Image className='w-0 lg:w-auto' src={free}/>
      <Image className='w-1/1 lg:w-0' src={freem}/>
    </div>
    <div className='flex relative'>
      <Image className='w-0 lg:w-auto' src={rs}/>
      <Image className='w-1/1 lg:w-0' src={rsm}/>
    </div>
  </Slider>
</section>
  );
};

export default Caroussel;
