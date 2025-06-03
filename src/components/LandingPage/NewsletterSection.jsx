import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function handleSubmit(e) {
  e.preventDefault();
  const email = e.target.elements.email.value;

  if (!email) {
    toast.error("Please enter a valid email");
    return;
  }

  toast.success("Subscribed successfully!");
  e.target.reset();
}


export default function NewsletterSection() {
  return (
    <section className="bg-[#fceac9] py-12 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Let’s Stay In Touch!</h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-6 text-lg">
        Join our newsletter, so that we reach out to you with our news and offers.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          name='email'
          placeholder="Enter Your Email"
          className="px-4 py-2 rounded-md border border-gray-300 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-[#d36e5b]"
        />
        <button
          type="submit"
          className="bg-[#FF7F50] text-white px-6 py-2 rounded-md hover:bg-[#a84434] transition-all duration-300 shadow"
        >
          Subscribe
        </button>
      </form>
        <ToastContainer />
    </section>
  );
}
