import Image from "next/image";
import React from "react";

import styles from "./MovieCard.module.css";
import { Movie } from "../types/Movie";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "/image-not-found.png";

  return (
    <div className={styles.card}>
      <div className={styles.posterContainer}>
        <img src={imageUrl} alt={movie.original_title} />
      </div>

      <h3>{movie.original_title}</h3>

      <div className={styles.ratingContainer}>
        <Image src="/star.png" width={15} height={15} alt="rating" />
        <p>{Number(movie.popularity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
