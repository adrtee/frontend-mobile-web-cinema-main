import Image from "next/image";
import React from "react";

import styles from "./MovieCard.module.css";
import { Movies } from "../types/Movie";

const MovieCard: React.FC<{ movie: Movies }> = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "/image-not-found.png";

  return (
    <div className={styles.card}>
      <div className={styles.posterContainer}>
        <img src={imageUrl} alt={movie.title} />
      </div>

      <h3>{movie.title}</h3>

      <div className={styles.ratingContainer}>
        <Image src="/star.png" width={15} height={15} alt="rating" />
        <p>{Number(movie.popularity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
