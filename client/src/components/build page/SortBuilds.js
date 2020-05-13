import React from 'react';
import './Builds.css';

const SortBuilds = ({ setSort }) => {
    return (
        <div className="dropdown">
            <button className="dropbtn">Sort Builds <i className="fa fa-sort-desc"></i></button>
            <div className="dropdown-content">
                <div className="dropdown-link" onClick={()=> setSort('upvotes')}>By Upvotes</div>
                <div className="dropdown-link" onClick={()=> setSort('dateD')}>Newest First</div>
                <div className="dropdown-link" onClick={()=> setSort('dateA')}>Oldest First</div>
            </div>
        </div>
    )
}

export default SortBuilds;
