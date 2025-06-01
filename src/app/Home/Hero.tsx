import React from "react";

import styles from "./Hero.module.css";

interface HeroProps {
  scrollToRef: React.RefObject<HTMLDivElement>;
}

const Hero: React.FC<HeroProps> = ({ scrollToRef }) => {
  const handleExploreClick = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <h1 className={styles.textEntrance}>Discover New Movies Today</h1>
        <h2 className={`${styles.textEntrance} ${styles.delay}`}>
          Find movies here and kickstart your movie-date!
        </h2>

        <button className={styles.button} onClick={handleExploreClick}>
          Explore movies!
        </button>
      </div>
    </section>
  );
};

export default Hero;
