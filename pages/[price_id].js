import useCart from "../app/(store)/store";
import { useRouter } from 'next/router';
import { useEffect } from "react";

function ProductPage(props) {
  const router = useRouter();
  const { price_id } = router.query;
  const { searchParams } = props;
  const product = useCart(state => state.product);
  const addItemToCart = useCart(state => state.addItemToCart);
  const { cost, productInfo, name, description } = product;

  useEffect(() => {
    // Vérifie si le nom du produit existe, sinon redirige vers '/'
    if (!product?.name) {
      router.push('/');
    }
  }, [product, router]);

  console.log(productInfo);

  function handleAddToCart() {
    console.log('PRICE ID: ', product.price_id);
    const newItem = {
      quantity: 1,
      price_id: product.price_id,
      name,
      cost,
      images: productInfo.images
    };
    addItemToCart({ newItem });

    router.push({
      pathname: '/[price_id]',
      query: { price_id },
    });
  }

  return (
    <div className="flex flex-col p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] mx-auto">
        <div className="md:p-2 md:shadow">
          <img src={productInfo?.images[0]} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex md:flex-col text-xl items-center justify-between gap-2">
            <h1 className='py-3 text-5xl'>{name}</h1>
            <hr className='w-6 mx-auto mt-2 border-black' />
            <h2 className='flex justify-center my-2 text-xl text-gray-800'>{cost / 100}€</h2>
          </div>
          <p className='text-xl pt-10'>{description}</p>
          <button onClick={handleAddToCart} className='flex mt-5 bg-cyan-700 justify-center mx-auto text-2xl text-white w-full py-3 rounded-md hover:bg-cyan-600'>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;