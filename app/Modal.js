"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import ReactDom from 'react-dom';
import useCart from './(store)/store';
import { IoMdCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function Modal() {
  const closeModal = useCart((state) => state.setOpenModal);
  const cartItems = useCart((state) => state.cart);
  const router = useRouter();
  const removeItemFromCart = useCart((state) => state.removeItemFromCart);
  const updateCartItemQuantity = useCart((state) => state.updateCartItemQuantity);

  async function checkout() {
    const lineItems = cartItems.map((cartItem) => {
      return {
        price: cartItem.price_id,
        quantity: cartItem.quantity,
      };
    });

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems }),
    });

    const data = await res.json();
    // Rediriger l'utilisateur vers la page de paiement
    router.push(data.session.url, '_blank');
  }

  return ReactDom.createPortal(
      <div className='fixed top-0 left-0 w-screen h-screen z-50'>
        <div onClick={closeModal} className='bg-transparent absolute inset-0'></div>
        <div className='flex flex-col bg-white absolute right-0 top-0 h-screen shadow-lg w-screen sm:w-96 max-w-screen gap-4'>
          <div className='flex items-center p-6 justify-between text-xl relative'>
            <h1>Panier</h1>
            <p
              onClick={closeModal}
              className='cursor-pointer hover:opacity-60'
            ><IoMdCloseCircle className='text-2xl'/></p>
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-slate-300 w-2/3'></div>
          </div>
          <div className='p-4 overflow-scroll flex-1 flex flex-col gap-4'>
            {cartItems.length === 0 ? (
              <p>Votre panier est vide</p>
            ) : (
              <>
                {cartItems.map((cartItem, itemIndex) => {
                  return (
                    <div key={itemIndex} className='flex border-l border-solid border-slate-700 px-4 gap-2'>
                      <div className='flex p-4'>
                      <div className=''>
                        {cartItem.images && cartItem.images.length > 0 && (
                          <img src={cartItem.images[0]} alt={cartItem.name} className='w-20 object-cover' />
                        )}
                      </div>
                      <div className='flex flex-col px-7 justify-center mx-auto'>
                        <div>
                        <h2 className='flex justify-center'>{cartItem.name}</h2>
                        <p className='flex justify-center'>{cartItem.cost / 100}€</p>
                        </div>
                        <div className='flex gap-3'>
                        <div className='flex justify-center mx-auto w-1/2 px-2 gap-3 border border-solid border-slate-400'>
                        <button
                          onClick={() => updateCartItemQuantity({ itemIndex, newQuantity: cartItem.quantity - 1 })}
                          className='text-gray-500 cursor-pointer pl-3'
                        >
                          -
                        </button>
                        <p>{cartItem.quantity}</p>
                        <button
                          onClick={() => updateCartItemQuantity({ itemIndex, newQuantity: cartItem.quantity + 1 })}
                          className='text-gray-500 cursor-pointer pr-3'
                        >
                          +
                        </button>
                        </div>
                        <button
                          onClick={() => removeItemFromCart({ itemIndex })}
                          className='w-1/2 cursor-pointer text-xl'
                        >
                          <MdDelete />
                        </button>
                        </div>
                      </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <button
            onClick={checkout}
            className='border border-solid border-slate-700 text-xl m-4 p-6 uppercase grid place-items-center hover:opacity-60 cursor-pointer'
          >
            Paiement
          </button>
        </div>
      </div>,
      document.getElementById('portal')
    );
  }
