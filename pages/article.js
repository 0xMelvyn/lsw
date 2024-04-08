import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import useCart from "../app/(store)/store";
import { useState } from 'react';

// Chargez la clé publique de Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// Fonction pour obtenir les articles depuis Stripe (côté serveur ou client)
const getArticles = async () => {
  const response = await fetch('https://api.stripe.com/v1/products', {
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET}`,
    },
  });

  const articles = await response.json();

  // Récupérer les détails du prix pour chaque article
  const articlesWithPrices = await Promise.all(
    articles.data.map(async (article) => {
      const priceResponse = await fetch(`https://api.stripe.com/v1/prices/${article.default_price}`, {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET}`,
        },
      });

      const priceData = await priceResponse.json();
      return { ...article, price: priceData };
    })
  );

  return articlesWithPrices;
};
const Test = ({ articles }) => {
  console.log('Articles:', articles);
  const router = useRouter();
  const { price_id } = router.query;
  const addItemToCart = useCart(state => state.addItemToCart);
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredArticles = articles.filter(
    (article) => article.default_price === price_id
  );

  const formatDescription = (description) => {
    return description.replace(/@/g, '<br />');
  };

  const handleAddToCart = (article) => {
    console.log('PRICE ID: ', article.default_price);
    const newItem = {
      quantity: 1,
      price_id: article.default_price,
      name: article.name,
      cost: article.price.unit_amount,
      images: article.images
    };
    addItemToCart({ newItem });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col pt-14 pb-24">    
  {filteredArticles.map((article) => (
    <div key={article.id} className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] mx-auto lg:gap-20">
    <div>
      <div className="md:p-2 md:shadow">
        <img src={selectedImage || article.images} alt={article.name} className="w-full h-full object-cover" />
      </div>
      <div className='flex flex-row gap-2 justify-center px-5 pt-2'>
        <img src={article.images} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(article.images)}/>
        <img src={article.metadata.sup1} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(article.metadata.sup1)}/>
        <img src={article.metadata.sup2} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(article.metadata.sup2)}/>
        <img src={article.metadata.sup3} alt="Pas d'image" className="w-1/4 hover:scale-105 transition" onClick={() => handleImageClick(article.metadata.sup3)}/>
      </div>
    </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="lg:flex md:flex-col text-xl items-center justify-between gap-2">
          <h1 className='py-3 text-5xl flex justify-center'>{article.name}</h1>
          <hr className='w-6 mx-auto mt-2 border-black' />
          {article.price && (
            <h2 className='flex justify-center my-2 text-xl text-gray-800'>{(article.price.unit_amount / 100)} €</h2>
          )}
        </div>
        <p className='text-xl pt-5 lg:pt-10' dangerouslySetInnerHTML={{ __html: formatDescription(article.description) }} />
        <button onClick={() => handleAddToCart(article)} className='flex mt-5 bg-cyan-700 justify-center mx-auto text-2xl text-white w-full py-3 rounded-md hover:bg-cyan-600'>Ajouter au panier</button>
      </div>
    </div>
  ))}
</div>
  );
};

export const getServerSideProps = async () => {
  const articles = await getArticles();

  return {
    props: {
      articles,
    },
  };
};

export default Test;
