import * as types from "./actionTypes";
// import axiosWithAuth from "../api/axiosWithAuth";
import axios from "axios";

export const logIn = credentials => dispatch => {
    dispatch({ type: types.LOGIN, payload: credentials });
    //login with Auth, .then sends LOGGEDIN action
    // axiosWithAuth() /// login
}

export const search = query => dispatch => {
    dispatch({ type: types.SEARCHING });
    axios.post("https://spotifindya.herokuapp.com/search", { name: query }).then(r => {
        dispatch({ type: types.SEARCH_DONE, payload: r.data.tracks.items })
    }).catch(e => console.log(e));
}

export const setActiveSong = song => dispatch => {
    dispatch({type: types.SET_ACTIVE_SONG, payload: song})
}

export const addFavorite = song => dispatch => {
    dispatch({type: types.ADD_FAVORITE, payload: song})
}

export const removeFavorite = song => dispatch => {
    dispatch({ type: types.REMOVE_FAVORITE, payload: song })
}