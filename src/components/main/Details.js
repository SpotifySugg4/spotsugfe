import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addFavorite, removeFavorite } from "../../actions/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import "../../styles/Details.scss";
import "../../styles/SongCard.scss";
const Details = props => {
    const song = props.activeSong;
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        if (song !== null) {
            axios.post("https://spotifindya.herokuapp.com/suggestions", { song_id: song.id }).then(r => setSuggestions(r.data.tracks)).catch(e => console.log(e))
        }
     },[song])
    return (
        
        <div className="details-container">
            <h2>Similar songs you might like</h2>
            {song === null ? <p>select a song from search results or your favorites</p> :
                (<>
                    <p>if you like "<a href={song.external_urls.spotify} target="new" className="track-name">{song.name}</a>" by {song.artists.map((artist, index) => [ index > 0 && ", ", <a href={artist.external_urls.spotify} target="new" key={`${song.name}-${artist}-${index}`} className='artist-name'>{artist.name}</a>])}, you might also like:</p>
                    <div className="suggestions-container">
                    
                        {suggestions.map((suggestion, i) => (
                            <div key={`suggestions-${i}`} className="song-card">
                                <div className="song-info">
                                <p><a href={suggestion.external_urls.spotify} target="new" className="track-name">{suggestion.name}</a></p><p>by {suggestion.artists.map((artist, index) => [index > 0 && ", ", <a href={artist.external_urls.spotify} target="new" key={`${suggestion.name}-${artist}-${index}`} className="artist-name">{artist.name}</a>])}</p>
                                </div>
                                    {props.favorites.filter(fav=>fav.id===suggestion.id).length>0 ? 
                                        <button onClick={()=>props.removeFavorite(suggestion)} className="remove-favorite"><FontAwesomeIcon icon={fasStar} className="star" /></button> :
                                        <button onClick={()=>props.addFavorite(suggestion)} className="add-favorite"><FontAwesomeIcon icon={farStar} className="star" /></button>
                                    }
                            </div>
                        ))}
                    </div>
                </>)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        activeSong: state.activeSong,
        favorites: state.favorites
    }
}

export default connect(mapStateToProps,{addFavorite,removeFavorite})(Details);