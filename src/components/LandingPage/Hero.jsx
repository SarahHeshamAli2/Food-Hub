


import React from 'react';
import food from '../../assets/images/edit.png';
import { motion } from "framer-motion";
import styles from './Hero.module.css';

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
    <main className={styles.main}>

      {/* background shape */}
      <motion.div
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.backgroundShape}
      />

      <div className={styles.containerBox}>
        <div className={styles.gridWrapper}>

          <div className={styles.textBox}>
            <motion.h1
              viewport={{ once: true }}
              variants={SlideUp(1)}
              initial="initial"
              whileInView="animate"
              className={`${styles.heading} dark:text-white `}
            >
              Enjoy The Delicious Food Experience
            </motion.h1>

            <motion.p
              viewport={{ once: true }}
              variants={SlideUp(1.5)}
              initial="hidden"
              whileInView="show"
              className={`${styles.paragraph} dark:text-white`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam molestiae modi obcaecati rem doloremqu sunt, sed temporibus quibusdam magni!
            </motion.p>
          </div>

          {/* food image */}
          <div className={styles.imageWrapper}>
            <motion.img
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              src={food}
              alt="food"
              className={styles.foodImage}
            />



          </div>

        </div>
      </div>
    </main>
  );
}
