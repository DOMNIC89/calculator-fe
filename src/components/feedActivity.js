import React from 'react';
import FeedElements from './feedElements';

const updateFeeds = (list) => {
    let mainDiv = [];
    list.forEach(element => {
        mainDiv.push(<FeedElements value={element} />)
    });
    return mainDiv;
}

const Feed = (props) => {
    const messages = props.feeds;
    return(
        <div className="mainFeed">
            {updateFeeds(messages)}
        </div>
    );
}

export default Feed;