import axios from "axios";

export default function axiosWithAuth() {
    return axios.create({ baseURL: "https://accounts.spotify.com/" })
}