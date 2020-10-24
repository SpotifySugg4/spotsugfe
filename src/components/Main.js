import React from "react";
import Details from "./main/Details";
import PrimaryList from "./main/PrimaryList";
import "../styles/Main.scss";
const Main = props => {
    return <div className="main">
        <PrimaryList />
        <Details />
    </div>
}
export default Main;