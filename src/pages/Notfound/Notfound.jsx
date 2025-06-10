import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col justify-center items-center text-center p-4">
      <div className="text-9xl font-bold text-black flex items-center gap-4">
        <span>4</span>
        <img
          src="https://i.imgur.com/M6y3pZh.png" // بيضة وسط الرقمين (صورة مشابهة من الإنترنت)
          alt="Egg"
          className="w-24 h-24"
        />
        <span>4</span>
      </div>
      <h1 className="text-3xl font-bold text-black mt-6">ERROR</h1>
      <p className="text-lg text-white mb-8">Page Not Found</p>
      <Link
        to="/"
        className="border-2 border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
      >
        BACK TO HOME
      </Link>
    </div>
  );
};

export default Notfound;
