import axios from "axios";
const token = "asdf";
export default function axiosWithAuth() {
    return axios.create({baseURL:"https://spotifindya.herokuapp.com", headers: {Authentication: `Bearer ${token}`}})
}