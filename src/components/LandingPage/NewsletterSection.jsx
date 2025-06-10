import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './NewsletterSection.module.css';

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
    <section className={styles.section}>
      <h2 className={styles.heading}>Let’s Stay In Touch!</h2>
      <p className={styles.description}>
        Join our newsletter, so that we reach out to you with our news and offers.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.button}
        >
          Subscribe
        </button>
      </form>
      <ToastContainer />
    </section>
  );
}

