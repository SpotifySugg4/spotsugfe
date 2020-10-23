import * as types from "../actions/actionTypes";
const initialState = {
    apiStatus: "",
    loggedIn: false,
    // true //
}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, apiStatus: "attempting to log in" }
        default: return state;
    }
}