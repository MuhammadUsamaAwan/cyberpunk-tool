import React, { useState, useContext } from 'react';
import { BuildsContext } from './BuildsContext';
import axios from "axios";

const SearchBuilds = () => {
    const [search, setSearch] = useState('');
    const [builds, setBuilds] = useContext(BuildsContext);

    const handleSearch = e => setSearch(e.target.value);
    const handleFilter = async (e) => {
        e.preventDefault();
        const res = await axios.get ('api/builds');
        const data = (res.data.filter (build => build.private !==true));
        const filterBuilds = data.filter(build => build.title.toLowerCase().includes(search.toLowerCase()) || build.name.toLowerCase().includes(search.toLowerCase()));
        setBuilds(filterBuilds);
    }
    return (
        <form onSubmit={handleFilter} className="search-form">
            <input type="text" className="search" placeholder="Search Builds by Title or Author..." value={search} onChange= {handleSearch}/>
            <button type="submit" className="search-icon"><i className="fa fa-search"></i></button>
        </form>
    )
}

export default SearchBuilds;
