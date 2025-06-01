"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import Hero from "./Home/Hero";
import styles from "./page.module.css";
import { Movie } from "./types/Movie";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("release_date.desc");

  const moviesSectionRef = useRef<HTMLDivElement>(null!);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const fetchMovies = async (reset = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/discover?sortBy=${sortBy}&page=${page}`);
      const data = await res.json();
      setMovies((prev) => (reset ? data.results : [...prev, ...data.results]));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    fetchMovies(true);
  }, [sortBy]);

  useEffect(() => {
    if (page === 1) return;
    fetchMovies();
  }, [page]);

  return (
    <div className={styles.container}>
      <Header />

      <Hero scrollToRef={moviesSectionRef} />

      <div ref={moviesSectionRef} className={styles.controls}>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" onChange={handleSort} value={sortBy}>
          <option value="release_date.desc">Most Recent</option>
          <option value="original_title.asc">A-Z</option>
          <option value="original_title.desc">Z-A</option>
          <option value="popularity.desc">Most Popular</option>
        </select>
      </div>

      <main className={styles.movieList}>
        {movies.map((movie, index) => {
          if (index === movies.length - 1) {
            return (
              <div ref={lastMovieElementRef} key={index}>
                <MovieCard movie={movie} />
              </div>
            );
          } else {
            return <MovieCard key={index} movie={movie} />;
          }
        })}
      </main>

      {loading && <p className={styles.loading}>Loading...</p>}
    </div>
  );
}
