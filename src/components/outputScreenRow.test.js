import {render} from '@testing-library/react';
import OutputScreenRow from './outputScreenRow';


test('check the presence of OutputScreenRow', () => {
    const renderedDom = render(<OutputScreenRow label="some-label" value='4' />)
    expect(renderedDom.getByLabelText('some-label')).toBeInTheDocument();
    expect(renderedDom.getByLabelText('some-label')).toHaveDisplayValue('4');
})