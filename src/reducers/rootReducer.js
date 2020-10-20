import * as types from "../actions/actionTypes";
const initialState = {
    apiStatus: "",
    loggedIn: true,
    searchResults: [],
    favorites: [],
    activeSong: null,
}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, apiStatus: "attempting to log in" }
        case types.LOGGED_IN:
            return { ...state, loggedIn: true, apiStatus: "" }
        case types.SEARCHING:
            return { ...state, apiStatus: "searching" }
        case types.SEARCH_DONE:
            return { ...state, apiStatus: "", searchResults: action.payload }
        case types.SET_ACTIVE_SONG:
            return { ...state, activeSong: action.payload }
        case types.ADD_FAVORITE:
            return { ...state, favorites: [...state.favorites, action.payload] }
        case types.REMOVE_FAVORITE:
            return {...state, favorites: state.favorites.filter(favorite=>favorite.id!==action.payload.id)}
        default: return state;
    }
}