import React, { useState } from "react";
import "../../styles/PrimaryList.scss";
const PrimaryList = props => {
    const [tabs, setTabs] = useState({ search: "active", favorites: "" });
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("");
    const search = e => {
        e.preventDefault();
        console.log(`searching for: ${query}`);
    }
    const filterFavorites = e => {
        e.preventDefault();
        console.log(`filtering: ${filter}`);
    }
    return (
        <div className="primary-list-container">
            <div className="tabs">
                <button className={tabs.search} onClick={()=>setTabs({search:"active",favorites:""})}>search</button>
                <button className={tabs.favorites} onClick={()=>setTabs({search:"",favorites:"active"})}>favorites</button>
            </div>
            <div className="list-container">
                {tabs.search === "active" && (
                    <form className="search-bar" onSubmit={search}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}>
                        </input>
                        <button type="submit">search</button>
                    </form>
                )}
                {tabs.favorites === "active" && (
                    <form className="filter-bar" onSubmit={filterFavorites}>
                        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        </input>
                        <button type="submit">filter</button>
                    </form>
                )}
                <div className="list">
                    <p>list here</p>
                </div>
            </div>
        </div>
    )
}

export default PrimaryList;