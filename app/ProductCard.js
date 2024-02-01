"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import useCart from './(store)/store'

export default function ProductCard(props) {
    const { product } = props
    const { id: price_id, unit_amount: cost, product: productInfo } = product
    const { name, description } = productInfo

    const setProduct = useCart(state => state.setProduct)

    const router = useRouter()

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
        <div onClick={onProductClick} className='flex flex-col hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out'>
            <img src={productInfo.images[0]} alt={name} className="w-full h-full object-cover" />
            <div className='flex flex-col gap-2 p-2'>
                <div className='items-center justify-between'>
                    <h1 className='flex justify-center text-4xl text-gray-700 mb-2 font-dense'>{name}</h1>
                    <hr className='w-6 mx-auto mt-2 border-gray-700' />
                    <h2 className='flex justify-center my-2 text-2xl text-gray-700 font-dense'>{cost / 100}€</h2>
                </div>
            </div>

        </div>
    )
}
