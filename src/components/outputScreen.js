import React from 'react';
import OutputScreenRow from './outputScreenRow.js';

const OutputScreen = (props) => {
    return (
        <div className="screen">
            <OutputScreenRow label="question" value={props.question} />
            <OutputScreenRow label="answer" value={props.answer}/>
        </div>
    )
}

export default OutputScreen;