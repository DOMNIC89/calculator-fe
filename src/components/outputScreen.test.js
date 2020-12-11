import {render} from '@testing-library/react';
import OutputScreen from './outputScreen';

test('Presence of question and answer', () => {
    const renderedDom = render(<OutputScreen />);
    expect(renderedDom.getByLabelText('question')).toBeInTheDocument();
    expect(renderedDom.getByLabelText('answer')).toBeInTheDocument();
});

test('given a value in the outputScreen is has the value', () => {
    const renderedDom = render(<OutputScreen question='4+4' answer='8' />);
    expect(renderedDom.getByLabelText(/question/i)).toHaveDisplayValue('4+4');
    expect(renderedDom.getByLabelText(/answer/i)).toHaveDisplayValue('8');
})

