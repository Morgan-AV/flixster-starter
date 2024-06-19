import React from "react";
import ReactDOM from 'react-dom/client'
import PropTypes from 'prop-types';
import "../MovieCard/MovieCard.css"


// MovieCard.propTypes = {
//     title: PropTypes.string.isRequired,
//     poster_path: PropTypes.string.isRequired,
//     vote_average: PropTypes.number.isRequired,
// };

const MovieCard = ({title}) => {
    return (
        <div className="MovieCard" onClick={onClose}>
            {/* <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`${title} poster`} />  
            <h2>{title}</h2>
            <div>Rating: {vote_average}</div>
                 */}
        </div>  
        

    )
}






export default MovieCard;