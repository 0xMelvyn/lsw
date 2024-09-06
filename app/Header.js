"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import useCart from './(store)/store'
import Modal from './Modal'
import { BsCart3, BsList, BsX } from "react-icons/bs";
import logo from '../public/logosite.gif';
import Image from 'next/image';
import dotenv from 'dotenv';
dotenv.config();

export default function Header() {
    const cartItems = useCart(state => state.cart)
    const openModal = useCart(state => state.openModal)
    const setOpenModal = useCart(state => state.setOpenModal)
    console.log(cartItems)

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

    return (
        <header>
            {openModal && (
                <Modal />
            )}
            <nav className='w-screen flex justify-around items-center'>
            <div className="lg:hidden flex">
        <button onClick={toggleMenu} className="hover:text-custom-purple transition duration-300 focus:outline-none">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>
      <Link className='flex lg:hidden justify-center' href="/"><Image src={logo} alt='Logo' width={200} height={200}/></Link>
      <ul className={`hidden lg:flex w-full h-auto z-50 justify-evenly items-center lg:static top-0 left-0 lg:w-auto bg-white lg:bg-transparent transform lg:transform-none transition-transform duration-300 space-y-12 lg:space-y-0`}>
        <li className='lg:w-1/5 px-4'>
            <h1 className="text-xl font-Metropolis-Regular hover:text-custom-purple transition duration-500 lg:px-8 text-gray-500 flex justify-center mx-auto">
                <Link href="/populaire">POPULAIRE</Link>
            </h1>
        </li>
        <li className='lg:w-1/5 px-4'>
            <h1 className="text-xl font-Metropolis-Regular hover:text-custom-purple transition duration-500 lg:px-8 text-gray-500 flex justify-center mx-auto">
                <Link href="/nouveau">NOUVEAU</Link>
            </h1>
        </li>
        <Link className='hidden lg:flex justify-center' href="/"><Image src={logo} alt='Logo' width={170} height={170}/></Link>
        <li className='lg:w-1/5 px-4'>
            <h1 className="text-xl font-Metropolis-Regular hover:text-custom-purple transition duration-500 lg:px-8 text-gray-500 flex justify-center mx-auto">
                <Link href="/contact">CONTACT</Link>
            </h1>
        </li>
        <li onClick={setOpenModal} className='flex justify-center lg:justify-start mx-auto lg:w-1/5 text-xl font-Metropolis-Regular hover:text-custom-purple transition duration-500 px-8 text-gray-500 hover:cursor-pointer'>
                {totalQuantity > -1 && (
                    <div className='absolute aspect-square pointer-events-none h-5 sm:h-6 grid place-items-center top-18 bg-blue-400 text-white rounded-full right-30 -translate-y-1/2 translate-x-1/2' >
                        <p className='text-xs sm:text-sm'>{totalQuantity}</p>
                    </div>
                )}
                <BsCart3 className='text-2xl hover:text-custom-purple transition duration-500 text-gray-500' />
            </li>
      </ul>
      <div onClick={setOpenModal} className='flex px-1 lg:hidden text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 lg:px-8 text-gray-500 hover:cursor-pointer'>
                    {totalQuantity > -1 && (
                        <div className='absolute aspect-square pointer-events-none h-5 sm:h-6 grid place-items-center top-18 bg-blue-400 text-white rounded-full right-30 -translate-y-1/2 translate-x-1/2'>
                            <p className='text-xs sm:text-sm'>{totalQuantity}</p>
                        </div>
                    )}
                    <BsCart3 className='text-2xl hover:text-blue-300 transition duration-500 text-gray-500' />
                </div>
                <div
        className={`fixed z-50 top-0 left-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="flex flex-col p-4">
          <button onClick={toggleMenu} className="self-end mb-4">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
          <Link onClick={() => setIsOpen(false)} className='flex justify-center' href="/"><Image src={logo} alt='Logo' width={200} height={200}/></Link>
          <Link
            href="/populaire"
            className="py-2 text-lg hover:text-custom-purple text-center transition duration-300 ease-in-out"
            onClick={() => setIsOpen(false)}
          >
            POPULAIRE
          </Link>
          <Link
            href="/nouveau"
            className="py-2 text-lg hover:text-custom-purple text-center transition duration-300 ease-in-out"
            onClick={() => setIsOpen(false)}
          >
            NOUVEAU
          </Link>
          <Link
            href="/contact"
            className="py-2 text-lg hover:text-custom-purple text-center transition duration-300 ease-in-out"
            onClick={() => setIsOpen(false)}
          >
            CONTACT
          </Link>
        </div>
        </div>
    </nav>
        </header>
    )
}