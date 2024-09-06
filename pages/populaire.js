import React, { useState, useEffect } from 'react';
import Stripe from 'stripe';
import ProductCard from '../app/ProductCard';

export async function getServerSideProps() {
  return {
    props: {
      stripeSecret: process.env.STRIPE_SECRET || 'YOUR_DEFAULT_VALUE'
    }
  };
}

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

const PeluchesPage = ({ stripeSecret }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [startingAfter, setStartingAfter] = useState(undefined);
  const [displayedProducts, setDisplayedProducts] = useState(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { prices, hasMore, nextStartingAfter } = await getStripeProducts(stripeSecret, startingAfter);
        const newProducts = prices.filter(product => !displayedProducts.has(product.id) && product.product.metadata.type === 'populaire');
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
  
  return (
    <main className='p-4 flex flex-col'>
      <div className='pt-4 max-w-[1300px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {products.map((product, productIndex) => (
          <ProductCard key={productIndex} product={product} />
        ))}
      </div>
    </main>
  );
};

export default PeluchesPage;
