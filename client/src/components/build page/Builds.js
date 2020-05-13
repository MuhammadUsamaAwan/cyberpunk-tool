import React, { useState } from 'react';
import SortBuilds from './SortBuilds';
import GetBuilds from './GetBuilds';
import SearchBuilds from './SearchBuilds';

const Builds = () => {
    const [sort, setSort] = useState('dateD');
    return (
        <React.Fragment>
            <h1 className="heading">Builds</h1>
            <div className="adjust">
                <SearchBuilds />
                <SortBuilds setSort={setSort} />
            </div>
            <GetBuilds sort={sort} />
        </React.Fragment>
    )
}

export default Builds
