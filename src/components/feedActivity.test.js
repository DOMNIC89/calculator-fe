import {render} from '@testing-library/react';
import FeedActivity from './feedActivity';


test("the presence of FeedActivity", () => {
    const feedList = [{
        "user": "Bob",
        "timestamp": "2020-12-19T17:40:39.948Z",
        "question": "2+2",
        "answer": "4"
    }];
    const utils = render(<FeedActivity feeds={feedList} />);
    expect(utils.getByTestId('mainFeed')).toBeInTheDocument();
    
})