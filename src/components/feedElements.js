import React from 'react';

const FeedElements = (props) => {
    const element = props.value;
    console.log(element.user);
    return (
        <div className="feed-detail" data-testid="feed-detail" key={element.timestamp}>
            <p className="question-answer">
                <span className="feed-detail-name">{element.user}: </span> {element.question}={element.answer}
            </p>
        </div>
    )
}

export default FeedElements;