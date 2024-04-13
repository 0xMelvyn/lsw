import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import Stripe from 'stripe';
import AboutSection from './composants/AboutSection';
import HowItWorks from './composants/HowItWorks';
import Caroussel from './composants/Caroussel';
import Populaires from './composants/Populaires';

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


  return (
    <div>
      <main className='bg-white'>
        <Caroussel currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
        <Populaires currentSlide={currentSlide2} setCurrentSlide={setCurrentSlide2} products={filteredProducts} />
        <HowItWorks/>
        <AboutSection/>
      </main>
    </div>
  );
}