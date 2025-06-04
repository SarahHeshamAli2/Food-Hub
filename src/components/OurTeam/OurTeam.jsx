import { useState } from "react";
import { ChevronDown } from "lucide-react";
import chefHat from '../../assets/images/chefHat.png';

export default function OurTeam() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSection = () => setIsOpen(!isOpen);

  return (
    <section className="flex flex-col items-center p-6">
      <div className="relative mb-4">
        {/* Title with hat over the M */}
        <h2 className="text-3xl font-bold relative z-10">Meet Our Chefs</h2>

        {/* Hat positioned on top of M */}
        <img
          src={chefHat}
          alt="Chef Hat"
          className="w-12 absolute left-[-10px] top-[-30px] z-20 rotate-[-20deg]"
        />
      </div>

      <button
        onClick={toggleSection}
        className="flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-105"
      >
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="grid grid-cols-2 gap-4 mt-6 transition-all duration-500">
          <img
            src={chefHat}
            alt="Chef 1"
            className="rounded-2xl shadow-md w-40 h-40 object-cover"
          />
          <img
            src="/chef2.jpg"
            alt="Chef 2"
            className="rounded-2xl shadow-md w-40 h-40 object-cover"
          />
          <img
            src="/chef3.jpg"
            alt="Chef 3"
            className="rounded-2xl shadow-md w-40 h-40 object-cover"
          />
          <img
            src="/chef4.jpg"
            alt="Chef 4"
            className="rounded-2xl shadow-md w-40 h-40 object-cover"
          />
        </div>
      )}
    </section>
  );
}
