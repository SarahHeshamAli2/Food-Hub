import { motion } from "framer-motion";
import team from "../../assets/images/team.png";

export default function HeroSection() {
  return (
    <section className="relative  bg-[#fff8f4] pb-24">
      <svg
        viewBox="0 0 1440 320"
        className="absolute top-0 left-0 w-full h-auto z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
  <path fill="#fff0f0" fill-opacity="1" d="M0,256L48,261.3C96,267,192,277,288,256C384,235,480,181,576,181.3C672,181,768,235,864,256C960,277,1056,267,1152,229.3C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>

      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 flex flex-col lg:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--primary-color)] mb-4">
            Discover the Team Behind Our Recipes
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Learn more about what defines true confidence, authenticity, and character. Let’s build your brand.
          </p>
     
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="lg:w-1/2 flex justify-center mt-10 lg:mt-0"
        >
          <div className="bg-white p-4 shadow-2xl border-[6px] border-white rounded-tr-[5rem] rounded-bl-[5rem]  ">
            <img
              src={team}
              alt="Personality Illustration" 
  className="w-96 h-auto object-fill transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-12 hover:translate-x-16"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
