import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import Stripe from 'stripe';
import AboutSection from './composants/AboutSection';
import HowItWorks from './composants/HowItWorks';
import Caroussel from './composants/Caroussel';
import Slider from 'react-slick';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import ProductCard from '../app/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from 'react-responsive';

export async function getServerSideProps() {
  return {
    props: {
      stripeSecret: process.env.STRIPE_SECRET || 'YOUR_DEFAULT_VALUE'
    }
  };
}

export default function Home({ stripeSecret }) {  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);

  async function getStripeProducts(stripeSecret, startingAfter = undefined) {
    const stripe = new Stripe(stripeSecret, {
      apiVersion: '2024-04-10'
    });
    const res = await stripe.prices.list({
      expand: ['data.product'],
      limit: 10,
      starting_after: startingAfter
    });
    const prices = res.data;
    return { prices, hasMore: res.has_more, nextStartingAfter: res.data.length > 0 ? res.data[res.data.length - 1].id : undefined };
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [startingAfter, setStartingAfter] = useState(undefined);
  const [displayedProducts, setDisplayedProducts] = useState(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { prices, hasMore, nextStartingAfter } = await getStripeProducts(stripeSecret, startingAfter);
        const newProducts = prices.filter(product => !displayedProducts.has(product.id));
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        newProducts.forEach(product => {
          displayedProducts.add(product.id);
        });
        setHasMore(hasMore);
        setStartingAfter(nextStartingAfter);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [stripeSecret, startingAfter, displayedProducts]);

  const filteredProducts = products.filter(product => {
    const productType = product.product.metadata.affichage;
    return productType === 'populaire';
  });

  const isMobile = useMediaQuery({ maxWidth: 767 });

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

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "100px",
    arrows: isMobile ? false : true, 
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
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
        <Caroussel currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
        <section className='pt-20 lg:pt-32'>
    <h1 className='flex justify-center text-7xl text-cyan-700 font-dense pb-5 text-center'>LES PLUS POPULAIRES</h1>

    <Slider {...settings} className=''>
    {filteredProducts.map((product, productIndex) => (
<div key={productIndex}>
<div className={` px-3 lg:px-0 lg:mx-10 py-10 transform ${currentSlide2 === productIndex ? 'scale-110 transition-transform' : 'scale-100 transition-transform'}`}>
  <ProductCard product={product} />
</div>
</div>
))}
</Slider>
</section>
        <HowItWorks/>
        <AboutSection/>
      </main>
    </div>
  );
}