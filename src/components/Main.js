import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Details from "./main/Details";
import PrimaryList from "./main/PrimaryList";
import "../styles/Main.scss";
import Spotify from 'spotify-web-api-node';
const Main = props => {
    const location = useLocation() || null;
    const [code, setCode] = useState(new URLSearchParams(location.search).get('code'))
    useEffect(() => {
        if (code == null) {
            window.location.href=`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}`
        }
        else {
            axios.post(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}`).then(r => console.log(r)).catch(e=>console.log(e));
        }
    },[]);
    const spotifyApi = new Spotify({
        clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI
    })
    
    return <div className="main">
        <PrimaryList />
        <Details />
    </div>
}
export default Main;