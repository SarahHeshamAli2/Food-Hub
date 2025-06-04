import React from 'react';
import vector from '../../assets/images/vectorMan.jpg'
import girlVector from '../../assets/images/girVector.JPG'
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

const chefs = [
  {
    name: 'Hazem Abdulrahman',
    role: 'Front-end expert',
    image: vector
  },
  {
    name: 'Jihan Fakhr',
    role: 'Front-End expert',
    image: girlVector,
  },
  {
    name: 'Chef Alejandro Cruz',
    role: 'Grill Master',
    image: 'https://source.unsplash.com/200x200/?chef,bbq',
  },
  {
    name: 'Chef Amara Blake',
    role: 'Vegan Innovator',
    image: 'https://source.unsplash.com/200x200/?chef,vegan',
  },
];

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 py-16 px-6 md:px-20">
      <section className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto text-lg">
          At <span className="font-semibold">FlavorFoundry</span>, we believe food should be fun, fresh, and full of flavor.
          Our passion is creating and sharing recipes that anyone can make at home.
          Whether you're a beginner or a seasoned cook, you're part of our kitchen family.
        </p>
      </section>

      <section className="mb-20">
        <h3 className="text-3xl font-bold text-center mb-12">Meet Our Chefs</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {chefs.map((chef, index) => (
            <div key={index} className="bg-gray-100 rounded-2xl shadow-md overflow-hidden p-6 text-center transition hover:scale-105 duration-300">
              <img src={chef.image} alt={chef.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
              <h4 className="text-xl font-semibold">{chef.name}</h4>
              <p className="text-sm text-gray-600">{chef.role}</p>
              <div className="flex justify-center gap-4 mt-4 text-gray-500">
                <FaInstagram />
                <FaTwitter />
                <FaFacebookF />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-3xl font-bold mb-6">Why Choose Us?</h3>
        <p className="max-w-3xl mx-auto text-lg">
          We test every recipe, break down the steps, and add a pinch of personality to everything we create.
          From one-pan wonders to Sunday feasts — your next favorite dish is just a click away.
          Cook with confidence. Cook with joy. Cook with us.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
