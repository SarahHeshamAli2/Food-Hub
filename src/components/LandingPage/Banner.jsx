import React from 'react';
import Bannerpng from "../../assets/images/banner.png";

import { motion } from "framer-motion";

const SlideUp = (delay) => ({
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay },
  },
});


const Banner = () => {
  return (
    <section>
      <div className="container py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 place-items-center">
          {/* Image Section */}
          <div className='relative w-[360px] h-[360px]'>
            {/* Orange Circle in Background */}
            <motion.div
             initial={{opacity:0}}
              whileInView={{opacity:1}}
              transition={{duration: 0.6 , delay:0.5}}
             className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] bg-[#FF7F50] rounded-full z-0   md:h-[400px] md:w-[400px]'></motion.div>

            {/* Image in Front */}
            <motion.img
            initial={{opacity:0 , x:-100 ,y:100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            whileHover={{ scale: 1.2, rotate:15, x: 50 , y:-50 }}
            transition={{ duration: 0.8 , delay:0.5 , 
              scale:{duration:0.5}
            }}
         

              src={Bannerpng}
              alt='banner'
              className='w-[360px] h-[360px] object-contain relative z-10  w-full lg:max-w-[350px] img-shadow'
            />
          </div>

          {/* Text Section */}
          <div className='space-y-5 lg:max-w-[400px]'>
            <motion.h1 
             variants={SlideUp(1)}
              initial="hidden"
              whileInView="show"
            className='text-6xl uppercase font-semibold font-leagueGothic'>
              The Best Yummy food in the Town
            </motion.h1>
            <motion.p  
            variants={SlideUp(1.3)}
              initial="hidden"
              whileInView="show">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque accusamus voluptate aut?
            </motion.p>
            <motion.button 
             variants={SlideUp(1.6)}
              initial="hidden"
              whileInView="show"
              className='btn-primary'>Order Now</motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
