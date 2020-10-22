import * as types from "./actionTypes";
import axiosWithAuth from "../api/axiosWithAuth";
import axios from "axios";
export const register = credentials => dispatch => {
    dispatch({ type: types.REGISTER });
    axios.post("https://tempbackend.herokuapp.com/users/register",credentials).then(r => {
        console.log(r);
        dispatch({type: types.REGISTERED }) 
    }).catch(e=>dispatch({type: types.REGISTER_FAILED}))
}

export const logIn = credentials => dispatch => {
    dispatch({ type: types.LOGIN });
    axios.post("https://tempbackend.herokuapp.com/users/login", credentials).then(r => {
        dispatch({ type: types.LOGGED_IN, payload: r.data.token })
        localStorage.setItem("token",r.data.token)
    }).catch(e=>dispatch({type: types.LOGIN_FAILED}))
}

export const logOut = () => dispatch => {
    dispatch({type: types.LOGOUT})
}

export const setToken = token => dispatch => {
    dispatch({type: types.SET_TOKEN, payload: token })
}

export const search = query => dispatch => {
    dispatch({ type: types.SEARCHING });
    axios.post("https://spotifindya.herokuapp.com/search", { name: query }).then(r => {
        dispatch({ type: types.SEARCH_DONE, payload: r.data.tracks.items })
    }).catch(e => dispatch({type: types.SEARCH_FAILED}));
}

export const getFavorites = () => dispatch => {
    dispatch({ type: types.GET_FAVORITES });
    axiosWithAuth("/favorites").then(r => {
        dispatch({type: types.GOT_FAVORITES, payload: r.data})
    }).catch(e=>dispatch({type: types.GET_FAVORITES_FAILED}))
}

export const setActiveSong = song => dispatch => {
    dispatch({type: types.SET_ACTIVE_SONG, payload: song})
}

export const addFavorite = song => dispatch => {
    //update these to work with backend
    dispatch({type: types.ADD_FAVORITE, payload: song})
}

export const removeFavorite = song => dispatch => {
    dispatch({ type: types.REMOVE_FAVORITE, payload: song })
}