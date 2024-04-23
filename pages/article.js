// article.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useCart from '../app/(store)/store';
import Stripe from 'stripe';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2024-04-10'
});

async function getStripeProduct(price_id) {
  try {
    // Utiliser la méthode retrieve pour récupérer les détails du prix
    const price = await stripe.prices.retrieve(price_id, {
      expand: ['product']
    });

    // Extraire les données pertinentes du prix et du produit associé
    const product = {
      price_id: price.id,
      cost: price.unit_amount,
      productInfo: price.product,
      name: price.product.name,
      description: price.product.description
      // Vous pouvez ajouter d'autres champs si nécessaire
    };

    return product;
  } catch (error) {
    // Gérer les erreurs de récupération des données du produit
    console.error('Error retrieving product data:', error);
    return null;
  }
}

const ArticlePage = ({ product }) => {
  const router = useRouter();

  // Utiliser le hook useState pour gérer l'état de selectedImage
  const [selectedImage, setSelectedImage] = useState(null);
  // Utiliser le hook useCart pour récupérer la fonction addItemToCart
  const addItemToCart = useCart(state => state.addItemToCart);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, cost, productInfo } = product;

  const formatDescription = (description) => {
    return description.replace(/@/g, '<br />');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    console.log('PRICE ID: ', product.price_id);
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

  return (
    <div className="flex flex-col pt-14 pb-24">    
  
    <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1050px] mx-auto lg:gap-20">
    <div>
      <div className="md:p-2 md:shadow">
      <img src={selectedImage || productInfo.images[0]} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className='flex flex-row gap-2 justify-center px-5 pt-2'>
        <img src={productInfo.images[0]} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(productInfo.images[0])}/>
        <img src={productInfo.metadata.sup1} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(productInfo.metadata.sup1)}/>
        <img src={productInfo.metadata.sup2} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(productInfo.metadata.sup2)}/>
        <img src={productInfo.metadata.sup3} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(productInfo.metadata.sup3)}/>
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
        <button onClick={handleAddToCart} className='flex mt-5 bg-cyan-700 justify-center mx-auto text-2xl text-white w-full py-3 rounded-md hover:bg-cyan-600 font-article'>Ajouter au panier</button>
      </div>
    </div>
</div>
  );
};

export async function getServerSideProps(context) {
  // Récupérer le price_id à partir du contexte de la requête
  const { price_id } = context.query;

  // Récupérer les données des produits en utilisant la même fonction que peluches.js
  const product = await getStripeProduct(price_id);

  // Retourner les données des produits comme props
  return {
    props: {
      product,
    },
  };
}

export default ArticlePage;
