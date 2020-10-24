import axios from "axios";
const token = localStorage.getItem("token");
export default function axiosWithAuth() {
    return axios.create({baseURL:"https://spotifindya.herokuapp.com", headers: {Authentication: `Bearer ${token}`}})
}