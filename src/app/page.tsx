"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";

import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import SearchNotFound from "./components/SearchNotFound";
import Hero from "./Home/Hero";
import styles from "./page.module.css";
import { Movies } from "./types/Movie";

export default function Home() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("release_date.desc");

  const moviesSectionRef = useRef<HTMLDivElement>(null!);
  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();

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
          <option value="title.asc">A-Z</option>
          <option value="title.desc">Z-A</option>
          <option value="popularity.desc">Most Popular</option>
        </select>
      </div>

      {movies.length === 0 && !loading ? (
        <SearchNotFound />
      ) : (
        <main className={styles.movieList}>
          {movies.map((movie, index) => {
            return (
              <div
                key={index}
                ref={index === movies.length - 1 ? lastMovieElementRef : null}
                onClick={() => router.push(`/detail/${movie.id}`)}
              >
                <MovieCard movie={movie} />
              </div>
            );
          })}
        </main>
      )}

      {loading && <p className={styles.loading}>Loading...</p>}
    </div>
  );
}
