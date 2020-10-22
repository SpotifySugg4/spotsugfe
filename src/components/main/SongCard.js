import React from "react";
import { connect } from "react-redux";
import { setActiveSong, addFavorite, removeFavorite } from "../../actions/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import "../../styles/SongCard.scss";
const SongCard = (props) => {
    const { name, artists, id } = props.song;
    const artistsNameList = artists.map(artist => artist.name).join(", ");
    const className = `song-card ${props.activeSong !== null && id === props.activeSong.id ? 'active' : ''}`;
    return (<div className={className}>
        <button className="song-info" onClick={()=>props.setActiveSong(props.song)}>
        <h3 className="track-name">{name}</h3>
            <p>by <span className="artist-name">{artistsNameList}</span></p>
        </button>
                                            {props.favorites.filter(fav=>fav.id===id).length>0 ? 
                                        <button onClick={()=>props.removeFavorite(props.song)} className="remove-favorite"><FontAwesomeIcon icon={fasStar} className="star" /></button> :
                                        <button onClick={()=>props.addFavorite(props.song)} className="add-favorite"><FontAwesomeIcon icon={farStar} className="star" /></button>
                                    }
    </div>)
}
const mapStateToProps = state => {
    return {
        activeSong: state.activeSong,
        favorites: state.favorites,
    }
}
export default connect(mapStateToProps, {setActiveSong, addFavorite, removeFavorite})(SongCard);