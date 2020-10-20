import React from "react";
import "../../styles/SongCard.scss";
const SongCard = ({ song }) => {
    const { name, album, artists, external_urls, id, popularity } = song;
    return (<div className="song-card">
        <h3>{name}</h3>
        <p>{external_urls.spotify}</p>
    </div>)
}

export default SongCard;