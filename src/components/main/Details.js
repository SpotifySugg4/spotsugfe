import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addFavorite, removeFavorite } from "../../actions/actions";
import "../../styles/Details.scss";
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
                    <p>if you like "<a href={song.external_urls.spotify} target="new">{song.name}</a>" by {song.artists.map((artist, index) => [ index > 0 && ", ", <a href={artist.external_urls.spotify} target="new" key={`${song.name}-${artist}-${index}`}>{artist.name}</a>])}, you might also like:</p>
                    <div className="suggestions-container">
                    
                        {suggestions.map((suggestion, i) => (
                            <div key={`suggestions-${i}`} className="suggestion-card">
                                <p><a href={suggestion.external_urls.spotify} target="new">{suggestion.name}</a></p>
                                <p>by {suggestion.artists.map((artist, index) => [index > 0 && ", ", <a href={artist.external_urls.spotify} target="new" key={`${suggestion.name}-${artist}-${index}`}>{artist.name}</a>])}</p>
                                <p>
                                    {props.favorites.filter(fav=>fav.id===suggestion.id).length>0 ? 
                                        <button onClick={()=>props.removeFavorite(suggestion)}>remove from favorites</button> :
                                        <button onClick={()=>props.addFavorite(suggestion)}>add to favorites</button>
                                    }
                                </p>
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