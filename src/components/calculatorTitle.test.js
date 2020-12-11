import {render, screen} from '@testing-library/react'
import CalculatorTitle from './calculatorTitle'

test("The Presence of calculator title is present", () => {
    render(<CalculatorTitle value="Title text"/>)
    expect(screen.getByText("Title text")).toBeInTheDocument();
})