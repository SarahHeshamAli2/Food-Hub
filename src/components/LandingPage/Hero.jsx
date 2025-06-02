import React from 'react'
import food from '../../assets/images/landing.png';
import { motion } from "framer-motion";

const SlideUp = (delay) => ({
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay },
  },
});

export default function Hero() {
  return (
    <main className="relative overflow-hidden"> 
      
      {/* background shape */}
<motion.div
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="w-[700px] h-[700px] bg-[#FF7F50] absolute bottom-[-100px] right-0 z-0"
  style={{
    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
  }}
/>
      <div className="container min-h-[600px] flex justify-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 place-items-center justify-between">
          
          {/* text content */}
          <div className='space-y-3 mt-14 text-center md:text-left md:mt-0'>
       
            <motion.h1
              variants={SlideUp(1)}
              initial="initial"
              whileInView="animate"
              className='text-4xl lg:text-5xl xl:text-6xl font-bold uppercase'>
              A Food Journey
            </motion.h1>
            <motion.p
              variants={SlideUp(1.5)}
              initial="hidden"
              whileInView="show"
              className='text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam molestiae modi obcaecati rem doloremque corporis cum ducimus eligendi quam, architecto repellat aliquam adipisci culpa sunt, sed temporibus quibusdam magni!
            </motion.p>
            <motion.button
              variants={SlideUp(2)}
              initial="hidden"
              whileInView="show"
              className='btn-primary inline-block !mt-10'>
              Sign Up
            </motion.button>
          </div>

          {/* food image */}
          <div className="relative z-10">
            <motion.img
              initial={{ opacity: 0, rotate: 20, x: 200, y: 100 }}
              whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              src={food}
              alt="food"
              className='w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px]'
            />
          </div>
        </div>
      </div>
    </main>
  );
}