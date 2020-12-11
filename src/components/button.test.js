import {render, screen, fireEvent} from '@testing-library/react';
import Button from './button';

test('Check the presence of button', () => {
    const mockClickFn = jest.fn();
    render(<Button label="4" handleClick={mockClickFn} />)
    expect(screen.getByText('4')).toBeInTheDocument();
});

test('given a click function when clicked should be called', () => {
    const mockClickFn = jest.fn();
    const utils = render(<Button label="4" handleClick={mockClickFn} />);
    fireEvent.click(utils.getByText('4'));
    expect(mockClickFn).toHaveBeenCalled();
});