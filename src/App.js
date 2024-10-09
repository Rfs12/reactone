import React, { useState, useEffect } from 'react';
import './app.css'; // Ensure correct file name for CSS
import SearchIcon from './search.svg';
import MovieCard from './Card'; // Correct relative path for MovieCa

const api_url = 'https://www.omdbapi.com?apikey=529a1797';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    const searchMovies = async (title) => {
        const response = await fetch(`${api_url}&s=${title}`);
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]); // Set to empty array if no results or error
        }
    }

    useEffect(() => {
        searchMovies('spiderman'); // Initial search when component mounts
    }, []);


    return (
        <div className='App'>
            <h1>MoviesPlace</h1>

            <div className='search'>
                <input
                    placeholder='Search movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Bind input value to state
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)} // Trigger search on icon click
                />
            </div>

            <div className='container'>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
           
        </div>
    );
}

export default App;
