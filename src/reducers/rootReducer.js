import * as types from "../actions/actionTypes";
const initialState = {
    apiStatus: "",
    loggedIn: true,
    searchResults: [],
    favorites: [],
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
            return {...state, apiStatus: "", searchResults: action.payload }
        default: return state;
    }
}