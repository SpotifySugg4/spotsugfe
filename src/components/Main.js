import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Details from "./main/Details";
import PrimaryList from "./main/PrimaryList";
import "../styles/Main.scss";
const Main = props => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    // const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    const redirectUri = encodeURI(process.env.REACT_APP_SPOTIFY_REDIRECT_URI);
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
                    baseURL: "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        // "Authorization": `Basic ${auth64}`,
                    },
                    // body: {
                    //     "grant_type": "authorization_code",
                    //     "code": code,
                    //     "redirect_uri": redirectUri,
                    //     "client_id": clientId,
                    //     "client_secret": clientSecret,
                    // }
                }).post(`/token`,{
                        "code": code,
                        "grant_type": "authorization_code",
                        "redirect_uri": redirectUri,
                        "client_id": clientId,
                        "client_secret": clientSecret,
                    }).then(r => console.log(r)).catch(console.log);
            //?grant_type=authorization_code&code=${code}&CLIENT_ID=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}
        }
    },[clientId,clientSecret,code,redirectUri]);
    
    return <div className="main">
        <PrimaryList />
        <Details />
    </div>
}
export default Main;