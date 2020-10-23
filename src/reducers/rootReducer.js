import * as types from "../actions/actionTypes";

const ls = key => JSON.parse(localStorage.getItem(key));
const loggedIn = ls("loggedIn") === null ? false : ls("loggedIn");
const username = ls("username") === null ? null : ls("username");
const favorites = ls("favorites") === null ? [] : ls("favorites");
const token = ls("token") === undefined ? null : ls("token");


const initialState = {
    apiStatus: "",
    loggedIn: loggedIn,
    username: username,
    searchResults: [],
    favorites: favorites,
    activeSong: null,
    token: token,
}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case types.REGISTER:
            console.log('register');
            return { ...state, apiStatus: "registering" }
        case types.REGISTERED:
            console.log('registered', action.payload.token)
            return { ...state, loggedIn: true, apiStatus: "", token: action.payload.token, username: action.payload.username }
        case types.REGISTER_FAILED:
            console.log('register failed');
            return { ...state, apiStatus: "registration failed" }
        case types.LOGIN:
            return { ...state, apiStatus: "attempting to log in" }
        case types.LOGGED_IN:
            return { ...state, loggedIn: true, apiStatus: "", token: action.payload.token, username: action.payload.username }
        case types.LOGIN_FAILED:
            return { ...state, loggedIn: false, apiStatus: "login failed", token: null }
        case types.LOGOUT:
            return { ...state, loggedIn: false, token: null }
        case types.SET_TOKEN:
            return { ...state, token: action.payload, loggedIn: true }
        case types.SEARCHING:
            return { ...state, apiStatus: "searching" }
        case types.SEARCH_DONE:
            return { ...state, apiStatus: "", searchResults: action.payload }
        case types.SEARCH_FAILED:
            return { ...state, apiStatus: "search failed", searchResults: [] }
        case types.GET_FAVORITES: 
            return { ...state, apiStatus: "getting favorites" }
        case types.GOT_FAVORITES:
            return { ...state, apiStatus: "", favorites: action.payload }
        case types.GET_FAVORITES_FAILED:
            return { ...state, apiStatus: "failed to get favorites", favorites: [] }
        case types.SET_ACTIVE_SONG:
            return { ...state, activeSong: action.payload }
        case types.ADD_FAVORITE:
            const newFavorites_add = [...state.favorites, action.payload];
            localStorage.setItem("favorites",JSON.stringify(newFavorites_add))
            return { ...state, favorites: newFavorites_add }
        case types.REMOVE_FAVORITE:
            const newFavorites_remove = state.favorites.filter(fav => fav.id !== action.payload.id);
            localStorage.setItem("favorites", JSON.stringify(newFavorites_remove));
            return {...state, favorites: newFavorites_remove}
        default: return state;
    }
}