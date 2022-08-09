import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    console.log();
    setMovies(data.results);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=pt-BR`;

    getSearchMovies(searchWithQueryURL);
  }, [query]);
  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies
          ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          : "Carregando..."}
      </div>
    </div>
  );
};

export default Search;
