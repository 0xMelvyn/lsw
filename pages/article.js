// article.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useCart from '../app/(store)/store';
import Stripe from 'stripe';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineLocalShipping } from "react-icons/md";
import { PiHeartBold } from "react-icons/pi";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2024-04-10'
});

async function getStripeProduct(price_id) {
  try {
    const price = await stripe.prices.retrieve(price_id, {
      expand: ['product']
    });

    const product = {
      price_id: price.id,
      cost: price.unit_amount,
      productInfo: price.product,
      name: price.product.name,
      description: price.product.description,
      metadata: price.product.metadata,
      colors: Object.keys(price.product.metadata).filter(key => key.startsWith('color_')).map(key => ({
        name: key.replace('color_', ''),
        price_id: price.product.metadata[key]
      }))
    };

    return product;
  } catch (error) {
    console.error('Error retrieving product data:', error);
    return null;
  }
}

const ArticlePage = ({ product }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const addItemToCart = useCart(state => state.addItemToCart);
  const [selectedOption, setSelectedOption] = useState('');

  // Assurer que 'product' est défini et initialiser 'colors' en tant que tableau vide par défaut
  const { name, description, cost, productInfo, colors = [] } = product || {};

  if (!product) {
    return <div>Loading...</div>;
  }

  const formatDescription = (description) => {
    return description ? description.replace(/@/g, '<br />') : '';
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    const newItem = {
      quantity: 1,
      price_id: product.price_id,
      name: name,
      cost: cost,
      images: productInfo.images
    };
    addItemToCart({ newItem });
    toast.success('Produit ajouté au panier !');
  };

  const handleOptionChange = (event) => {
    const selectedColor = colors.find(color => color.name === event.target.value);
    if (selectedColor) {
      router.push(`/article?price_id=${selectedColor.price_id}`);
    }
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col pt-14 pb-24">    
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1050px] mx-auto lg:gap-20">
        <div>
          <div className="md:p-2 md:shadow">
            <img src={selectedImage || productInfo.images[0]} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className='flex flex-row gap-2 justify-center px-5 pt-2'>
            <img src={productInfo.images[0]} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(productInfo.images[0])}/>
            <img src={productInfo.metadata?.sup1} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(productInfo.metadata?.sup1)}/>
            <img src={productInfo.metadata?.sup2} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(productInfo.metadata?.sup2)}/>
            <img src={productInfo.metadata?.sup3} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(productInfo.metadata?.sup3)}/>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="lg:flex md:flex-col text-xl items-center justify-between gap-2">
            <h1 className='py-3 text-6xl flex justify-center font-dense'>{name}</h1>
            <hr className='w-6 mx-auto mt-2 border-black' />
            {cost && (
              <h2 className='flex justify-center my-2 text-xl text-gray-800 font-article'>{(cost / 100)} €</h2>
            )}
          </div>
          <p className='text-xl pt-5 lg:pt-10 font-article' dangerouslySetInnerHTML={{ __html: formatDescription(description) }} />
          {colors.length > 0 && (
            <div className='mt-5'>
              <label htmlFor="color" className='text-xl font-article'>Choisis une couleur :</label>
              <select id="color" className='ml-3 p-2 border' value={selectedOption} onChange={handleOptionChange}>
                <option value="">Couleur</option>
                {colors.map(color => (
                  <option key={color.price_id} value={color.name}>{color.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className='flex justify-around mt-8'>
            <div>
              <PiHeartBold className='mx-auto text-6xl text-red-300'/>
              <p className=' text-lg text-gray-800 font-article justify-center'>100% Fait Main</p>
            </div>
            <div>
              <MdOutlineLocalShipping className='mx-auto text-6xl text-red-300'/>
              <p className=' text-lg text-gray-800 font-article justify-center'>1-2 semaines</p>
            </div>
            <div>
              <HiOutlineBadgeCheck className='mx-auto text-6xl text-red-300'/>
              <p className=' text-lg text-gray-800 font-article justify-center'>Certifié Oeko-Tex</p>
            </div>
          </div>
          <button onClick={handleAddToCart} className='flex mt-5 bg-cyan-700 justify-center mx-auto text-2xl text-white w-full py-3 rounded-md transition duration-500 hover:bg-cyan-600 font-article'>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { price_id } = context.query;
  const product = await getStripeProduct(price_id);

  return {
    props: {
      product,
    },
  };
}

export default ArticlePage;
