// import React from 'react';
// import styles from './NotFound.module.css';
// import robotImg from '../../assets/images/notfound.json'; 
// import { Link } from 'react-router-dom';
// import Lottie from 'lottie-react';

// const Notfound = () => {
//   return (
//     <div className={styles.container}>
//       <Lottie animationData={robotImg} className={styles.image} />
//       {/* <img src={robotImg} alt="Lost Robot" className={styles.image} /> */}
//       <h1 className={styles.title}>404 - Meal Not Found</h1>
//       <p className={styles.text}>Oops! Your food took a wrong turn.</p>
//       <Link to="/" className={styles.button}>Back to Home</Link>
//     </div>
//   );
// };

// export default Notfound;



import React from 'react';
import styles from './NotFound.module.css';
import Lottie from 'lottie-react';
import notfound from '../../assets/images/404.png'; 
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.animation}>
        <img src={notfound} alt="Not Found"  />

      </div>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! This page is scrambled 🥚</p>
      <Link to="/" className={styles.homeBtn}>Back to Home</Link>
    </div>
  );
};

export default Notfound;
