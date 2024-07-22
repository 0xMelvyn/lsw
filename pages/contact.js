'use client'
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {

  const form = useRef();
  const darkMode = false; // or your condition for dark mode

  const sendEmail = (e) => {
    e.preventDefault();

    // Show the toast notification immediately
    toast.success('Email envoyé !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
    });

    emailjs.sendForm('service_qaggn0i', 'template_f3ul5tq', form.current, 'SPdoern9JLwWLz_FV')
      .then((result) => {
        console.log('Email successfully sent!');
      }, (error) => {
        console.log(error.text);
      });

    e.target.reset();
  };

  return (
    <div className="flex px-20 items-center justify-center">
      <div className='flex flex-col text-center basis-1/3 flex-1'>
        <form className='flex flex-col gap-5 py-5' ref={form} onSubmit={sendEmail}>
          <input className='shadow-lg border-2 border-solid border-gray-200 bg-transparent rounded-lg p-5' type="text" name='name' placeholder='Nom' required />
          <input className='shadow-lg border-2 border-solid border-gray-200 bg-transparent rounded-lg p-5' type="email" name='email' placeholder='Email' required />
          <textarea className='shadow-lg border-2 border-solid border-gray-200 bg-transparent rounded-lg p-5' name="message" rows="7" placeholder='Message' required></textarea>
          <button className='shadow-lg bg-cyan-700 rounded-lg p-5 hover:bg-cyan-600 transition duration-500 text-white' type='submit'>Envoyer</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
