import React from 'react';
import './Builds.css';

const SortBuilds = ({ setSort }) => {
    return (
        <div className="dropdown">
            <button className="dropbtn">Sort Builds</button>
            <div className="dropdown-content">
                <div className="dropdown-link" onClick={()=> setSort('upvotes')}>By Upvotes</div>
                <div className="dropdown-link" onClick={()=> setSort('dateA')}>By Date(Asecending)</div>
                <div className="dropdown-link" onClick={()=> setSort('dateD')}>By Date(Descending)</div>
            </div>
        </div>
    )
}

export default SortBuilds;
