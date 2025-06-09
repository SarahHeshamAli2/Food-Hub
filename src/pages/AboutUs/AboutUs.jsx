import styles from './AboutUs.module.css';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Esraa Ahmed Ali",
      emoji: "👩‍💻"
    },
    {
      name: "Jihan Ahmed Mahmoud",
    //   role: "Frontend Developer & UI/UX Enthusiast",
    //   bio: "Crafting beautiful, user-friendly experiences one pixel at a time.",
      emoji: "👩‍💻"
    },
    {
      name: "Sarah Hesham Ali",
      emoji: "👩‍💻"
    },
    {
      name: "Hazem Abdulrahman",
      emoji: "👨‍💻"
    }
  ];

  return (
    <div className={styles.aboutUs}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>About <span>Food Hub</span></h1>
        <p>Where passion for food meets cutting-edge technology!</p>
      </section>

      {/* Story Section */}
      <section className={styles.section}>
        <h2>🍽️ Our Story</h2>
        <p>
          Food Hub was born out of a shared love for great food and innovative solutions. 
          Our goal? To connect food lovers with their favorite meals in the easiest, 
          fastest, and most enjoyable way possible.
        </p>
      </section>

      {/* Team Section */}
      <section className={styles.section}>
        <h2>👩‍💻 Meet the Team</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <span className={styles.emoji}>{member.emoji}</span>
              <h3>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.bio}>"{member.bio}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.section}>
        <h2>🚀 Our Mission</h2>
        <ul className={styles.missionList}>
          <li>Make food ordering <strong>fast, easy, and fun</strong></li>
          <li>Support local restaurants and food businesses</li>
          <li>Use technology to enhance the dining experience</li>
          <li>Deliver happiness, one meal at a time</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>💡 Join Our Journey</h2>
        <p>Follow us on social media or reach out to collaborate!</p>
        <button className={styles.ctaButton}>Explore Food Hub Now</button>
      </section>
    </div>
  );
};

export default AboutUs;