import * as types from "../actions/actionTypes";
const initialState = {
    apiStatus: "",
    loggedIn: false,
    username: null,
    searchResults: [],
    favorites: [],
    activeSong: null,
    token: null,
}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case types.REGISTER:
            return { ...state, apiStatus: "registering" }
        case types.REGISTERED:
            return { ...state, apiStatus: "" }
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
            return { ...state, favorites: [...state.favorites, action.payload] }
        case types.REMOVE_FAVORITE:
            return {...state, favorites: state.favorites.filter(favorite=>favorite.id!==action.payload.id)}
        default: return state;
    }
}