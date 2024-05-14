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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            {openModal && (
                <Modal />
            )}
            <nav className='flex justify-around items-center lg:px-40 pb-6'>
            <div className='flex lg:hidden items-center'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-4xl">
                        <BsList />
                    </button>
                </div>
                <Link className='flex lg:hidden justify-center' href="/"><Image src={logo} alt='Logo' width={250} height={250}/></Link>
                <ul className={`fixed lg:flex w-full h-screen lg:h-auto z-50 justify-evenly items-center lg:static top-0 left-0 lg:w-auto bg-white lg:bg-transparent transform lg:transform-none transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} space-y-24 lg:space-y-0`}>
                <div className='absolute right-0 p-4 lg:hidden'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-4xl">
                        <BsX />
                    </button>
                </div>
                <Link className='flex lg:hidden justify-center' onClick={handleMenuClose} href="/"><Image src={logo} alt='Logo' width={250} height={250}/></Link>
                    <li className='lg:w-1/5 px-4' onClick={handleMenuClose}><h1 className={`text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 lg:px-8 text-gray-500 flex justify-center mx-auto`}><Link href="/peluches">PELUCHES</Link></h1></li>
                    <li className='lg:w-1/5' onClick={handleMenuClose}><h1 className={`text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 px-8 text-gray-500 flex justify-center mx-auto`}><Link href="/mode">MODE</Link></h1></li>
                    <Link className='hidden lg:flex justify-center' href="/"><Image src={logo} alt='Logo' width={170} height={170}/></Link>
                    <li className='lg:w-1/5' onClick={handleMenuClose}><h1 className={`text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 px-8 text-gray-500 flex justify-center mx-auto`}><Link href="/maison">MAISON</Link></h1></li>
                    <li onClick={setOpenModal} className='flex justify-center lg:justify-start mx-auto lg:w-1/5 text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 px-8 text-gray-500 hover:cursor-pointer'>
                {totalQuantity > -1 && (
                    <div className='absolute aspect-square pointer-events-none h-5 sm:h-6 grid place-items-center top-18 bg-blue-400 text-white rounded-full right-30 -translate-y-1/2 translate-x-1/2' >
                        <p className='text-xs sm:text-sm'>{totalQuantity}</p>
                    </div>
                )}
                <BsCart3 className='text-2xl hover:text-blue-300 transition duration-500 text-gray-500' />
            </li>
                </ul>
                <div onClick={setOpenModal} className='flex lg:hidden text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 lg:px-8 text-gray-500 hover:cursor-pointer'>
                    {totalQuantity > -1 && (
                        <div className='absolute aspect-square pointer-events-none h-5 sm:h-6 grid place-items-center top-18 bg-blue-400 text-white rounded-full right-30 -translate-y-1/2 translate-x-1/2'>
                            <p className='text-xs sm:text-sm'>{totalQuantity}</p>
                        </div>
                    )}
                    <BsCart3 className='text-2xl hover:text-blue-300 transition duration-500 text-gray-500' />
                </div>
            </nav>
        </header>
    )
}