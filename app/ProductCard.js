"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useCart from './(store)/store'

export default function ProductCard(props) {
    const { product } = props
    const { id: price_id, unit_amount: cost, product: productInfo } = product
    const { name, description, images } = productInfo

    const [showLoader, setShowLoader] = useState(true)
    const [imgLoaded, setImgLoaded] = useState(false)

    const setProduct = useCart(state => state.setProduct)
    const router = useRouter()

    useEffect(() => {
        // Show loader for at least 500ms before hiding
        const timer = setTimeout(() => {
            setShowLoader(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    function onProductClick() {
        const newProduct = {
            name,
            description,
            price_id,
            cost,
            productInfo
        }
        setProduct({ newProduct })
        router.push('/article?price_id=' + price_id)
    }

    return (
        <div onClick={onProductClick} className='flex flex-col hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out scale-105 lg:scale-100'>
            {showLoader ? (
                <div className="items-center justify-center animate-pulse">
                <div className="relative w-full pb-[100%] bg-gray-300">
                    <div className="absolute inset-0 bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center gap-2 p-2">
                    <div className="w-3/4 h-6 bg-gray-300 mb-2"></div>
                    <hr className='w-6 mx-auto mt-2 border-gray-700' />
                    <div className="w-1/2 h-4 my-2 bg-gray-300"></div>
                </div>
            </div>
            
            
            ) : (
                <>
                    <img 
                        src={images[0]} 
                        alt={name} 
                        className="w-full h-full object-cover"
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgLoaded(false)}
                    />
                    <div className='flex flex-col gap-2 p-2'>
                        <div className='items-center justify-between'>
                            <h1 className='flex justify-center text-center text-4xl text-gray-700 mb-2 font-dense'>{name}</h1>
                            <hr className='w-6 mx-auto mt-2 border-gray-700' />
                            <h2 className='flex justify-center my-2 text-2xl text-gray-700 font-dense'>{cost / 100}€</h2>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
