import React from "react";
import { connect } from "react-redux";
import SongCard from "./SongCard";
const SongList = props => {
    return (<>
        { props.apiStatus !== "" ?
            <p>{props.apiStatus}</p> :
                props.list.length === 0 ?
                    <p>no results</p> :
                props.list.map((song,i) => <SongCard song={song} key={`songlistitem-${i}`}/>)
        }
    </>)
}

const mapStateToProps = state => {
    return {
        apiStatus: state.apiStatus
    }
}
export default connect(mapStateToProps, {})(SongList);