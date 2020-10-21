import React from "react";
import { connect } from "react-redux";
import { setActiveSong } from "../../actions/actions";
import "../../styles/SongCard.scss";
const SongCard = (props) => {
    const { name, artists, id } = props.song;
    const artistsNameList = artists.map(artist => artist.name).join(", ");
    const className = `song-card ${props.activeSong !== null && id === props.activeSong.id ? 'active' : ''}`;
    return (<button className={className} onClick={()=>props.setActiveSong(props.song)}>
        <h3>{name}</h3>
        <p>by <span>{artistsNameList}</span></p>
    </button>)
}
const mapStateToProps = state => {
    return {
        activeSong: state.activeSong
    }
}
export default connect(mapStateToProps, {setActiveSong})(SongCard);