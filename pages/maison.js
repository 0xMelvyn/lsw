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
        const newProducts = prices.filter(product => !displayedProducts.has(product.id) && product.product.metadata.type === 'maison');
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

  if (loading) {
    const dummyProducts = Array.from({ length: 6 }, (_, index) => index + 1);

    return (
        <div className='pt-4 max-w-[1300px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {dummyProducts.map((_, index) => (
                <div key={index} className='flex flex-col cursor-pointer'>
                    <div className="w-full h-full bg-gray-300 square-1000"></div> 
                    <div className='flex flex-col gap-2 p-2'>
                        <div className='items-center justify-between'>
                            <h1 className='flex justify-center mx-auto text-4xl text-gray-700 mb-2 font-dense w-3/4 bg-gray-200 h-8'></h1> 
                            <hr className='w-6 mx-auto mt-2 border-gray-700' />
                            <h2 className='flex justify-center mx-auto my-2 text-2xl text-gray-700 font-dense w-1/2 bg-gray-200 h-6'></h2> 
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
  }
  

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
