import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, Flame, UserCircle } from "lucide-react";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({ id, image, title, auther, calories }) {
  return (
    <Link to={`/recipes/${id}`} className="no-underline text-inherit">
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
          <button className={styles.bookmarkBtn}>
            <Bookmark size={18} className={styles.bookmarkIcon} />
          </button>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.info}>
            <div className={styles.author}>
              <UserCircle size={16} />
              <span>{auther}</span>
            </div>
            <div className={styles.calories}>
              <Flame size={16} className={styles.flameIcon} />
              <span>{calories} cals</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
