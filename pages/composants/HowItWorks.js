import React from 'react';
import Image from 'next/image';
import h1 from '../../public/how-it-works-1.png.webp';
import h2 from '../../public/how-it-works-2.png.webp';
import h3 from '../../public/how-it-works-3.png.webp';
import h4 from '../../public/how-it-works-4.png.webp';

const HowItWorks = () => {
  return (
    <section className='px-5 lg:px-20'>
      <div className='lg:px-20 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 my-10'>
        <div className='lg:flex lg:flex-col justify-center'>
          <div className='flex justify-around'>
            <Image src={h1} alt='1'/>
          </div>
          <h1 className='flex pt-2 justify-center text-2xl mb-2 font-article text-gray-600 text-center'>CHOISIS TA PELUCHE</h1>
        </div>

        <div className='lg:flex lg:flex-col justify-center'>
          <div className='flex justify-around'>
            <Image src={h2} alt='2'/>
          </div>
          <h1 className='flex pt-2 justify-center text-2xl mb-2 font-article text-gray-600 text-center'>JE LA FAIS AVEC AMOUR</h1>
        </div>

        <div className='lg:flex lg:flex-col justify-center'>
          <div className='flex justify-around'>
            <Image src={h3} alt='3'/>
          </div>
          <h1 className='flex pt-2 justify-center text-2xl mb-2 font-article text-gray-600 text-center'>JE TE L'ENVOIE</h1>
        </div>

        <div className='lg:flex lg:flex-col justify-center'>
          <div className='flex justify-around'>
            <Image src={h4} alt='4'/>
          </div>
          <h1 className='flex pt-2 justify-center text-2xl mb-2 font-article text-gray-600 text-center'>TU LA CÂLINES !</h1>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;