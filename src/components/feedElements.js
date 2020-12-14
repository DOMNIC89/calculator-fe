import React from 'react';

const FeedElements = (props) => {
    const element = props.value;
    return (
        <div className="feed-detail">
            <p className="question-answer">
                <span className="feed-detail-name">{element.user}: </span> {element.question}={element.answer}
            </p>
        </div>
    )
}

export default FeedElements;