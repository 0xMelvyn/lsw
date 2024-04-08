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

async function getStripeProducts(stripeSecret) {
  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2020-08-27'
  });
  const res = await stripe.prices.list({
    expand: ['data.product']
  });
  const prices = res.data;
  return prices;
}

const PeluchesPage = ({ stripeSecret }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Nouvel état pour le chargement

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getStripeProducts(stripeSecret);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Fin du chargement, quelle que soit la situation
      }
    };

    fetchProducts();
  }, [stripeSecret]); // Run effect whenever stripeSecret changes

  // Filter products based on metadata before rendering
  const filteredProducts = products.filter(product => {
    const productType = product.product.metadata.type;
    return productType === 'mode';
  });

  if (loading) {
    // Tableau de valeurs fictives pour simuler trois produits
    const dummyProducts = Array.from({ length: 6 }, (_, index) => index + 1);

    return (
        <div className='pt-4 max-w-[1300px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {dummyProducts.map((_, index) => (
                <div key={index} className='flex flex-col cursor-pointer'>
                    <div className="w-full h-full bg-gray-300 square-1000"></div> {/* Carré noir de 1000x1000 */}
                    <div className='flex flex-col gap-2 p-2'>
                        <div className='items-center justify-between'>
                            <h1 className='flex justify-center mx-auto text-4xl text-gray-700 mb-2 font-dense w-3/4 bg-gray-200 h-8'></h1> {/* Rectangle vide pour le nom */}
                            <hr className='w-6 mx-auto mt-2 border-gray-700' />
                            <h2 className='flex justify-center mx-auto my-2 text-2xl text-gray-700 font-dense w-1/2 bg-gray-200 h-6'></h2> {/* Rectangle vide pour le prix */}
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
        {filteredProducts.map((product, productIndex) => (
          <ProductCard key={productIndex} product={product} />
        ))}
      </div>
    </main>
  );
};

export default PeluchesPage;
