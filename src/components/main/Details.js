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
            axios.post("https://spotifindya.herokuapp.com/suggestions", { song_id: song.id }).then(r => setSuggestions(r.data)).catch(e => console.log(e))
        }
     },[song])
    return (
        
        <div className="details-container">
            {song === null ? <p>select a song from search results or your favorites</p> :
                (<>
                    <h3><a href={song.external_urls.spotify} target="new">{song.name}</a></h3>
                <h4>by {song.artists.map((artist, index) => [ index > 0 && ", ", <a href={artist.external_urls.spotify} target="new" key={`${song.name}-${artist}-${index}`}>{artist.name}</a>])} </h4>
                    <p>popularity: {song.popularity}</p>
                    <p>from the album: <a href={song.album.external_urls.spotify} target="new">{song.album.name}</a></p>
                        {/* <img src={song.album.images[1].url} alt={`${song.album.name} cover`}/> */}
                    <div className="suggestions-container">
                        <h3>Similar songs you might like</h3>
                        {suggestions.map((suggestion, i) => <p key={`${suggestions}-${i}`}>{suggestion}</p>)}
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