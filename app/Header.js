"use client"
import Link from 'next/link'
import React from 'react'
import useCart from './(store)/store'
import Modal from './Modal'
import { BsCart3 } from "react-icons/bs";
import logo from '../public/logosite.gif';
import Image from 'next/image';

export default function Header() {
    const cartItems = useCart(state => state.cart)
    const openModal = useCart(state => state.openModal)
    const setOpenModal = useCart(state => state.setOpenModal)
    console.log(cartItems)
    return (
        <header>
            {openModal && (
                <Modal />
            )}
            <nav className='flex justify-center items-center'>
                <ul className={`flex justify-center items-center`}>
                    <li className='w-1/5'><h1 className={`lg:text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 px-8 text-gray-500 flex justify-center mx-auto`}><Link href="/peluches">PELUCHES</Link></h1></li>
                    <li className='w-1/5'><h1 className={`lg:text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 px-8 text-gray-500 flex justify-center mx-auto`}><Link href="/mode">MODE</Link></h1></li>
                    <Link className='flex justify-center' href="/"><Image src={logo} width={170} height={170}/></Link>
                    <li className='w-1/5'><h1 className={`lg:text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 px-8 text-gray-500 flex justify-center mx-auto`}><Link href="/maison">MAISON</Link></h1></li>
                    <li onClick={setOpenModal} className='w-1/5 lg:text-xl font-Metropolis-Regular hover:text-blue-300 transition duration-500 px-8 text-gray-500 hover:cursor-pointer'>
                {cartItems.length > -1 && (
                    <div className='absolute aspect-square pointer-events-none h-5 sm:h-6 grid place-items-center top-16 bg-blue-400 text-white rounded-full right-30 -translate-y-1/2 translate-x-1/2' >
                        <p className='text-xs sm:text-sm'>{cartItems.length}</p>
                    </div>
                )}
                <BsCart3 className='text-2xl hover:text-blue-300 transition duration-500 text-gray-500' />
            </li>
                </ul>
            </nav>
        </header>
    )
}