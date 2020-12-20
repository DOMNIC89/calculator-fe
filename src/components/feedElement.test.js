import {render} from '@testing-library/react';
import FeedElements from './feedElements';

test("the presence of FeedElement", () => {
    const feedList = {
        "user": "Bob",
        "timestamp": "2020-12-19T17:40:39.948Z",
        "question": "2+2",
        "answer": "4"
    };

    const utils = render(<FeedElements value={feedList} />)
    expect(utils.getByText("Bob:")).toBeInTheDocument();
    expect(utils.getByText("2+2=4")).toBeInTheDocument();
});