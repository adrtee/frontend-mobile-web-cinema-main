import Image from "next/image";

import styles from "./page.module.css";
import Header from "../../components/Header";
import SearchNotFound from "../../components/SearchNotFound";

interface DetailPageParams {
  params: {
    id: string;
  };
}

interface Genre {
  id: number;
  name: string;
}

interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export default async function Detail({ params }: DetailPageParams) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${id}`
  );
  const data = await res.json();
  const movie = data.data;

  let imageUrl = "/image-not-found.png";
  if (movie) {
    imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "/image-not-found.png";
  }

  return (
    <div>
      <Header />

      {movie != null ? (
        <div className={styles.container}>
          <h1>
            {movie.title}{" "}
            {movie.original_title !== movie.title &&
              `(${movie.original_title})`}
          </h1>

          <div className={styles.movieContainer}>
            <div className={styles.posterContainer}>
              <Image
                src={imageUrl}
                alt="poster"
                layout={"fill"}
                objectFit={"contain"}
              />
            </div>
            <div className={styles.detailsContainer}>
              <div className={styles.details}>
                <h2>Synopsis:</h2>
                <p>{movie.overview ? movie.overview : "N/A"}</p>
              </div>
              <div className={styles.details}>
                <h2>Genres:</h2>
                <p>
                  {movie.genres.length > 0
                    ? movie.genres.map((genre: Genre) => genre.name).join(", ")
                    : "N/A"}
                </p>
              </div>
              <div className={styles.details}>
                <h2>Language:</h2>
                <p>
                  {movie.spoken_languages.length > 0
                    ? movie.spoken_languages
                        .map((lang: Language) => lang.english_name)
                        .join(", ")
                    : "N/A"}
                </p>
              </div>
              <div className={styles.details}>
                <h2>Duration:</h2>
                <p>{movie.runtime} minutes</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SearchNotFound />
      )}
    </div>
  );
}
