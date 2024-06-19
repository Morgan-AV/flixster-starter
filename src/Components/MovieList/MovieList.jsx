import MovieCard from "../MovieCard/MovieCard";
import { useEffect, useState } from "react";
import "../MovieCard/MovieCard.css"
import "../MovieList/MovieList.css"
import SearchBar from "../SearchBar/SearchBar";
import Modal from "../Modal/Modal";



const MovieList = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [movies, setMovies] = useState([]); //saving an array
    const [searchTerms, setSearchTerms] = useState(""); //saving a string
    const [displayCount, setDisplayCount] = useState(10);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);
    const [sortOption, setSortOption] = useState("title");
    const [likedMovies, setLikedMovies] = useState({});


    useEffect (() => {
        async function fetchMovies(){
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
                );
                const data = await response.json();
                console.log("data is:", data);
                setMovies(data.results || []);
        }
        fetchMovies();
        console.log("movies fetched")    
    }, []);


    const fetchMovieDetails = async (id) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        console.log("More movie data is:", data);
        setMovieDetails(data || []);
    }
    
    const filteredMovies = movies.filter((movies) =>        
        movies.original_title.toLowerCase().includes(searchTerms.toLowerCase())
    );

    const sortMovies = (movies, sortOption) => {
        return [...movies].sort((a,b) => {
            if (sortOption === "title") {
                return a.original_title.localeCompare(b.original_title);
            } else if (sortOption === "release_date") {
                return new Date(b.release_date) - new Date(a.release_date);
            } else if (sortOption === "rating") {
                return b.vote_average - a.vote_average;
            }
            return 0;
        });
    }

    const handleLikeButtonClick = (event, movie) => {
        event.stopPropagation();
        setLikedMovies((prevLikedMovies) => {
            const updatedLikedMovies = { ...prevLikedMovies };
            if (updatedLikedMovies[movie.id]) {
                delete updatedLikedMovies[movie.id];
            } else {
                updatedLikedMovies[movie.id] = true;
            }
            return updatedLikedMovies;
        });
    };

    const sortedMovies = sortMovies(filteredMovies, sortOption);

    const handleLoadMore = () => {
        setDisplayCount(displayCount + 10);
    };
    
    const handleMovieCard = (movie) => {
        setSelectedMovie(movie);
        fetchMovieDetails(movie.id);
    }

    function refreshPage(){
        window.location.reload();
        // setSearchTerms(""); // Reset search terms
        // setSortOption("title"); // Reset sort option to default
        // setDisplayCount(10); // Reset display count
        // setSelectedMovie(null); // Reset selected movie
        // setMovieDetails(null); // Reset movie details
        // fetchMovies(); // Refetch the movies
    } 

    return (
        <>

            <div className="heady">
                <div className="playbutton" onClick={refreshPage}>Now Playing</div>
                <SearchBar setMovies={setMovies}/>
                <div className="sortBar">
                    <label htmlFor="sort">Sort by:</label>
                    <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="home">Home</option>
                    <option value="title">Alphabetical</option>
                    <option value="release_date">Release Date</option>
                    <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            <div className="MovieList" >
                {sortedMovies.slice(0, displayCount).map((movie) => (
                    
                    <div key={movie.id} className="MovieCard" onClick={() => handleMovieCard(movie)}> 
                        <img className="movieimg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} /> 
                        <h2>{movie.original_title}</h2>
                        <div>Rating: {movie.vote_average}</div>
                        <div className="like-section">
                        <button className="watchedbtn"
                            className={`watchedbtn ${likedMovies[movie.id] ? "liked" : ""}`}
                            onClick={(event) => handleLikeButtonClick(event, movie)}                        >
                            Favorite
                        </button>
                    </div>                    
</div>
                
                ))}

                {selectedMovie && movieDetails && (
                <Modal
                show={selectedMovie !== null}
                onClose={() => setSelectedMovie(null)}
                >
                    <h2 className="modtitle">{selectedMovie.original_title}</h2>
                    <img className="modalmovieimg" src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`} alt={selectedMovie.original_title} /> 
                    <div className="modrelease">Release Date: {selectedMovie.release_date}</div>
                    <div className="modoverview">Overview: {selectedMovie.overview}</div>
                    <div>Runtime: {movieDetails.runtime} minutes</div>
                    <div>
                    Genres:{" "}
                    {movieDetails.genres.map((genre) => genre.name).join(", ")}
                    </div>                
            </Modal>
                )}

                {displayCount < filteredMovies.length && (
                    <button onClick={handleLoadMore} className="load-more-button">
                        Load More
                    </button>
                )}

            </div>

        </>
    );
};

export default MovieList;
    


    