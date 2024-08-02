import React from 'react';
import Image from 'next/image';
import tp from '../../public/tp.png'

const Avis = () => {
  return (
    <section className='  justify-around px-5 lg:px-64'>
        <div className=''>
            <div className='flex mx-auto w-fit'>
                <a href="https://fr.trustpilot.com/review/lulusweetworld.shop" target='_blank'>
                <Image src={tp} width={300} alt='trustpilot'/>
                <p className='px-5'>TrustScore <span className=' font-bold'>4,1</span></p>
                </a>
            </div>
        </div>
    </section>
  );
};

export default Avis;