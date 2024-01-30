// app/peluches.js
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Stripe from 'stripe';
import ProductCard from '../app/ProductCard';

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

const PeluchesPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getStripeProducts();
      console.log(fetchedProducts);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <main className='p-4 flex flex-col'>
      <div className='max-w-[1000px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products.map((product, productIndex) => (
          <ProductCard key={productIndex} product={product} />
        ))}
      </div>
    </main>
  );
};

export default PeluchesPage;