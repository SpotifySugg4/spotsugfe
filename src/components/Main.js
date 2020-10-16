import React from "react";
import Details from "./main/Details";
import PrimaryList from "./main/PrimaryList";

const Main = props =>
{
    return <div className="main">
        <PrimaryList />
        <Details />
    </div>
    //layout option:
    //vertical scroll list of song cards on left (search results or favorites with tabs)
    //when clicked song info pops up to right with list of suggested songs (as cards) below song info
    //when clicked, song info pops up with no option to see deeper suggestions

    //components needed:
    //primary list container (with tabs)
        //search results (with search bar)
            //songcardlist
                //songcard
        //favorites (with filter bar)
            //songcardlist
                //songcard
    //detail container
        //songdetails
            //songcardlist
                //songcard
}
export default Main;