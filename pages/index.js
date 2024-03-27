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
import ProductCard from '../app/ProductCard';
import Stripe from 'stripe';

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

  async function getStripeProducts() {
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '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', {
      apiVersion: '2020-08-27'
    });
    const res = await stripe.prices.list({
      expand: ['data.product']
    });
    const prices = res.data;
    return prices;
  }
  
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        const fetchedProducts = await getStripeProducts();
        console.log(fetchedProducts);
        setProducts(fetchedProducts);
      };
  
      fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
      const productType = product.product.metadata.affichage;
      return productType === 'populaire';
    });

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
              <p className='text-4xl font-dense lg:text-8xl lg:mx-20 pb-2 lg:px-0'>La collection spéciale pâcques est là !</p>
              <hr className='w-2/3 border-black mx-auto' />
            </div>
            <a href="#" className='bg-517e94 px-4 py-2 rounded-3xl hover:bg-b0e7f5 transition duration-300 ease-in-out font-article'>Voir la collection</a>
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
              <p className='text-4xl font-dense lg:text-8xl lg:mx-20 pb-2 lg:px-0'>La collection spéciale pâcques est là !</p>
              <hr className='w-2/3 border-black mx-auto' />
            </div>
            <a href="#" className='bg-517e94 px-4 py-2 rounded-3xl hover:bg-b0e7f5 transition duration-300 ease-in-out font-article'>Voir la collection</a>
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
              <p className='text-4xl font-dense lg:text-8xl lg:mx-20 pb-2 lg:px-0'>La collection spéciale pâcques est là !</p>
              <hr className='w-2/3 border-black mx-auto' />
            </div>
            <a href="#" className='bg-517e94 px-4 py-2 rounded-3xl hover:bg-b0e7f5 transition duration-300 ease-in-out font-article'>Voir la collection</a>
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
  </Slider>
</section>
        
        <section className='mt-20 lg:pt-10 lg:pb-20'>
          <div className='hidden lg:block absolute w-full pt-32 px-10'>
            <hr className='pt-6' />
            <hr className='pt-7' />
            <hr className='pt-6' />
            <hr className='pt-6' />
            <hr className='pt-7' />
            <hr className='pt-6' />
          </div>
          <div className='hidden -rotate-[5deg] lg:flex lg:absolute justify-center mx-20'>
            <div className=' justify-center p-2 pb-3 bg-red-200'>
              <Image
                src={mathilde}
                width={330}
                alt='Lulu'
              />
              <div>
              <p className='flex justify-center pt-2 text-gray-700 text-xl font-LovelyValentine'>
  Lucile, creatrice de Lulu&apos;s Sweet World</p>
              </div>
            </div>
          </div>
          <div className='lg:w-2/3 pt-8 mx-8 md:mx-72 lg:ml-96 my-10 lg:my-0'>
            <div className='border-dashed border-4 border-gray-700 py-10 px-6 lg:px-20 text-xl font-article rounded-3xl'>
            <p className='text-5xl text-gray-800 text-center lg:text-left'>Qui suis-je ?</p>
            <div className='lg:hidden -rotate-[5deg] flex lg:absolute pt-10 justify-center mx-2'>
            <div className=' justify-center p-2 pb-3 bg-red-200'>
              <Image
                src={mathilde}
                width={330}
                alt='Lulu'
              />
              <div>
              <p className='flex justify-center pt-2 text-gray-700 text-xl font-LovelyValentine'>
  Lucile, creatrice de Lulu&apos;s Sweet World</p>
              </div>
            </div>
          </div>
            <br />
            <p className='text-gray-700 pt-5 lg:pt-0 font-article text-justify'>Bienvenue à tous les amoureux de l&apos;artisanat et du <span className='text-red-300'>fait-main </span>! Je suis Lucile, la passionnée derrière chaque création. Cela fait maintenant quatre ans que le <span className='text-red-300'>crochet</span> fait partie de ma vie, et chacune des pièces que vous trouverez ici est fabriquée avec mon coeur.</p>
            </div>
          </div>
        </section>

        <section className='pt-10 lg:pt-20'>
          <h1 className='flex justify-center text-7xl text-cyan-700 font-dense pb-5 text-center'>LES PLUS POPULAIRES</h1>

          <Slider {...settings2} className=''>
          {filteredProducts.map((product, productIndex) => (
    <div key={productIndex}>
      <div className={`mx-4 lg:mx-10 py-10 transform ${currentSlide2 === productIndex ? 'scale-110 transition-transform' : 'scale-100 transition-transform'}`}>
        <ProductCard product={product} />
      </div>
    </div>
  ))}
</Slider>
    </section>

        <section className='px-5 lg:px-20'>

<div className='lg:px-20 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 my-10'>

    <div className=' lg:flex lg:flex-col justify-center'>
      <div className='flex justify-around'>
        <Image src={h1} alt='1'/>
      </div>
      <h1 className='flex pt-2 justify-center text-2xl mb-2 font-dense text-gray-600 text-center'>CHOISIS TA PELUCHE</h1>
    </div>

    <div className='lg:flex lg:flex-col justify-center'>
      <div className='flex justify-around'>
        <Image src={h2} alt='2'/>
      </div>
      <h1 className='flex pt-2 justify-center text-2xl mb-2 font-dense text-gray-600 text-center	'>JE LA FAIS AVEC AMOUR</h1>
    </div>

    <div className='lg:flex lg:flex-col justify-center'>
      <div className='flex justify-around'>
        <Image src={h3} alt='3'/>
      </div>
      <h1 className='flex pt-2 justify-center text-2xl mb-2 font-dense text-gray-600 text-center	'>JE TE LENVOIE</h1>
    </div>

    <div className='lg:flex lg:flex-col justify-center'>
      <div className='flex justify-around'>
        <Image src={h4} alt='4'/>
      </div>
      <h1 className='flex pt-2 justify-center text-2xl mb-2 font-dense text-gray-600 text-center'>TU LA CÂLINES !</h1>
    </div>

</div>

</section>

      </main>
    </div>
  )
}