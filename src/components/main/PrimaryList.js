import React from "react";

const PrimaryList = props => {
    return (
        <div className="primary-list-container">
            <div className="tabs">
                <button>search</button><button>favorites</button>
            </div>
            <div className="list">
                <p>list here</p>
            </div>
        </div>
    )
}

export default PrimaryList;