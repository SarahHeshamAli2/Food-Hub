import React from 'react';
import { FaRocket, FaLightbulb, FaUsers, FaCode } from 'react-icons/fa';

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-6 ">
      <h2 className="text-center text-3xl font-bold mb-12 text-[var(--primary-color)]">
        Why Choose Us as Developers?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
          <FaRocket className="text-[var(--primary-color)] text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[var(--primary-color)]">
            Fast & Efficient
          </h3>
          <p className="text-gray-600">We deliver high-quality code on time.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
          <FaLightbulb className="text-[var(--primary-color)] text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[var(--primary-color)]">
            Innovative Solutions
          </h3>
          <p className="text-gray-600">Creative approaches to solve your problems.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
          <FaUsers className="text-[var(--primary-color)] text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-[var(--primary-color)]">
            Collaborative Team
          </h3>
          <p className="text-gray-600">We work closely with you for best results.</p>
        </div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center px-4 text-gray-700">
        <h3 className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">About Our Dev Team</h3>
        <p className="text-lg leading-relaxed">
          We’re a passionate group of developers dedicated to building performant, scalable, and user-friendly applications. Our expertise spans front-end, back-end, and design, ensuring seamless digital experiences.
        </p>
        <p className="mt-3 italic text-gray-600">
          Built with React and a love for clean code.
        </p>
      </div>
    </section>
  );
}
