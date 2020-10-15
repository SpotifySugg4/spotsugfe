import * as types from "./actionTypes";
import axiosWithAuth from "../api/axiosWithAuth";

export const logIn = credentials = dispatch => {
    dispatch({ type: types.LOGIN, payload: credentials });
    //login with Auth, .then sends LOGGEDIN action
    // axiosWithAuth() /// login
}