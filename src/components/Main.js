import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Details from "./main/Details";
import PrimaryList from "./main/PrimaryList";
import "../styles/Main.scss";
const Main = props => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    const location = useLocation() || null;
    const [code] = useState(new URLSearchParams(location.search).get('code'))
    useEffect(() => {
        if (code == null) {
            window.location.href=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`
        }
        else {
            const auth64 = btoa(`${clientId}:${clientSecret}`);
            console.log("code: ", code);
            console.log("auth64: ", auth64);
            console.log(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`);
            axios.create(
                {
                    baseURL: "https://accounts.spotify.com/api",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Basic ${auth64}`,
                    },
                    body: {
                        "grant_type": "authorization_code",
                        "code": code,
                        "redirect_uri": redirectUri,
                    }
                }).post(`/token`).then(r => console.log(r)).catch(e=>console.log(e));
        }
    },[clientId,clientSecret,code,redirectUri]);
    
    return <div className="main">
        <PrimaryList />
        <Details />
    </div>
}
export default Main;