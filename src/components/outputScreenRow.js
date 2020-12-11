import React from 'react';

const OutputScreenRow = (props) => {
    return (
        <div className="screen-row">
            <input type="text" aria-label={props.label} readOnly value={props.value} />
        </div>
    )
}

export default  OutputScreenRow;