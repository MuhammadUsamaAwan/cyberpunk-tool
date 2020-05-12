import React, { useState } from 'react';
import SortBuilds from './SortBuilds';
import GetBuilds from './GetBuilds';

const Builds = () => {
    const [sort, setSort] = useState('dateA');
    return (
        <React.Fragment>
            <h1 className="heading">Builds</h1>
            <SortBuilds setSort={setSort} />
            <GetBuilds sort={sort} />
        </React.Fragment>
    )
}

export default Builds
