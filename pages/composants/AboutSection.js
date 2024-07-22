import React from 'react';
import Image from 'next/image';
import mathilde from '../../public/mathilde.png';

const AboutSection = () => {
  return (
    <section className='mt-20 lg:pt-10 lg:pb-20'>
      <div className='hidden lg:block absolute w-full pt-32 px-10'>
        <hr className='pt-6' />
        <hr className='pt-7' />
        <hr className='pt-6' />
        <hr className='pt-6' />
        <hr className='pt-7' />
        <hr className='pt-6' />
      </div>
      <div className='hidden -rotate-[5deg] lg:flex lg:absolute justify-center mx-20'>
        <div className=' justify-center p-2 pb-3 bg-red-200'>
          <Image
            src={mathilde}
            width={330}
            alt='Lulu'
          />
          <div>
            <p className='flex justify-center pt-2 text-gray-700 text-xl font-LovelyValentine'>
              Lucile, creatrice de Lulu&apos;s Sweet World
            </p>
          </div>
        </div>
      </div>
      <div className='lg:w-2/3 pt-8 mx-4 md:mx-72 lg:ml-96 my-10 lg:my-0'>
        <div className='border-dashed border-4 border-gray-700 py-10 px-4 lg:px-20 text-xl font-article rounded-3xl'>
          <p className='text-5xl text-gray-800 text-center lg:text-left'>Qui suis-je ?</p>
          <div className='lg:hidden -rotate-[5deg] flex lg:absolute pt-10 justify-center mx-2'>
            <div className=' justify-center p-2 pb-3 bg-red-200'>
              <Image
                src={mathilde}
                width={330}
                alt='Lulu'
              />
              <div>
                <p className='flex justify-center pt-2 text-gray-700 text-xl font-LovelyValentine'>
                  Lucile, creatrice de Lulu&apos;s Sweet World
                </p>
              </div>
            </div>
          </div>
          <br />
          <p className='text-gray-700 pt-5 lg:pt-0 font-article text-justify'>Bienvenue à tous les amoureux de l&apos;artisanat et du <span className='text-red-300'>fait-main</span> ! Je suis Lucile, la passionnée derrière chaque création. Cela fait maintenant quatre ans que le <span className='text-red-300'>crochet</span> fait partie de ma vie, et chacune des pièces que vous trouverez ici est fabriquée avec mon cœur.</p>
        </div>
      </div>
    </section> 
  );
};

export default AboutSection;