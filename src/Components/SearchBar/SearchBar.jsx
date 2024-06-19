import MovieCard from "../MovieCard/MovieCard";
import { useState, useEffect } from "react";
import "../MovieCard/MovieCard.css"
import "../MovieList/MovieList.css"
import "../SearchBar/SearchBar.css"


const SearchBar = ({setMovies}) => {
    
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [searchTerms, setSearchTerms] = useState(""); //saving a string
    
    useEffect(() => {
        if (searchTerms.trim() !== "") {
            const fetchMovies = async () => {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerms}`);
                const data = await response.json();
                setMovies(data.results || []);               
            };
            fetchMovies();
        }
    }, [searchTerms]);
    

    

    return (
        <>
            
            <div className="search-container">
                <input  
                type="text"
                placeholder="Search Movies.."
                value={searchTerms}
                onChange={(e) => {setSearchTerms(e.target.value)}
                }
                className="search-input"
                />
            </div>

            {/* <div className="MovieList">
                {movies.map((movie) => (
                    // <MovieCard key={movie.id} movie={movie} className="movie-item" > 
                    //     { <div key={movie.id} className="MovieCard" > 
                    //     <img className="movieimg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} /> 
                    //     <h2>{movie.original_title}</h2>
                    //     <div>Rating: {movie.vote_average}</div>
                    //     </div>}
                    // </MovieCard>


                <div key={movie}>
                    <div key={movie.id} className="MovieCard" > 
                        <img className="movieimg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} /> 
                        <h2>{movie.original_title}</h2>
                        <div>Rating: {movie.vote_average}</div>
                    </div>
                </div>
                ))}
            </div> */}

            {/* <button onClick={fetchSearchMovies} className="load-more">Load More</button> */}

        </>
        );
    };
    



export default SearchBar;







    // useEffect (() => {
    
    //     async function fetchMovies(){
    //         try{ 
    //             const response = await fetch(
    //                 // `'https://api.themoviedb.org/3/authentication', options}`

    //                 `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`
    //             );
    //             const data = await response.json();
    //             console.log("data is:", data);
    //             setSelectedMovies(data.results || []);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     }
    //     fetchMovies();
    //     console.log("movies fetched")

    // }, []);

    // const filteredMovies = movies.filter((movies) =>        
    //     movies.original_title.toLowerCase().includes(searchTerms.toLowerCase())
    // );
