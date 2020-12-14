import {render, screen, fireEvent} from '@testing-library/react';
import Calculator from './calculator';
import {config} from '../Constants';

test('Check the presence of title', () => {
    render(<Calculator />);
    const screenTitle = screen.getByText(/Sezzle Calculator/i);
    expect(screenTitle).toBeInTheDocument();
  });

  test('Check if the question is being updated', () => {
      render(<Calculator />);
      const operandNode1 = screen.getByText(/7/i);
      fireEvent.click(operandNode1);
      const operandNode2 = screen.getByText("+");
      fireEvent.click(operandNode2);
      const operandNode3 = screen.getByText(/5/i);
      fireEvent.click(operandNode3);
      expect(screen.getByLabelText(/question/i)).toHaveValue("7+5");
  })

  test('Change in the button is reflected in question', () => {
      const dom = render(<Calculator />);
      fireEvent.click(dom.getByText('2'));
      expect(dom.getByLabelText(/question/i).value).toBe('2'); 
  })

  test('Check if the answer is being updated', () => {
      render(<Calculator />)
      const mockResponseSuccess = {};
      const mockJsonPromise = Promise.resolve(mockResponseSuccess);
      const mockFetchPromise = Promise.resolve( {
          json: mockJsonPromise,
      });

      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
      fireEvent.click(screen.getByText(/7/i));
      fireEvent.click(screen.getByText("*"));
      fireEvent.click(screen.getByText(/5/i));
      fireEvent.click(screen.getByText(/=/i));
      const requestPayload = {"body": JSON.stringify({
        question: "7*5",
        answer: "35",
        timestamp: new Date().toISOString(),
        user: localStorage.getItem('username')
    })}
      expect(global.fetch).toHaveBeenCalledWith(config.url.POST_CALCULATOR_ACTIVITY, requestPayload);
      expect(screen.getByLabelText("answer")).toHaveValue('35');
  })

  test('When clear is called the question row should be cleared', () => {
    const mockResponseSuccess = {};
    const mockJsonPromise = Promise.resolve(mockResponseSuccess);
    const mockFetchPromise = Promise.resolve( {
        json: mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);  
    render(<Calculator />);
    screen.getByLabelText(/question/i).value='78';
    fireEvent.change(screen.getByLabelText(/question/i), {target: {value: '78'}})
    fireEvent.click(screen.getByText(/Clear/i));
    expect(screen.getByLabelText(/question/i)).toHaveDisplayValue("")
  })

  test('When clear is called the answer input should be cleared', () => {
        const mockResponseSuccess = {};
        const mockJsonPromise = Promise.resolve(mockResponseSuccess);
        const mockFetchPromise = Promise.resolve( {
            json: mockJsonPromise,
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);  
        
        const utils = render(<Calculator />);
        utils.getByLabelText(/answer/i).value='25';   
        fireEvent.change(utils.getByLabelText(/answer/i), {
            target: {value: '25'}
            });
        fireEvent.click(screen.getByText(/Clear/i));
        expect(screen.getByLabelText(/answer/i)).toHaveDisplayValue("");
  })

  test('When delete is called once only one character is deleted', () => {
        const mockResponseSuccess = {};
        const mockJsonPromise = Promise.resolve(mockResponseSuccess);
        const mockFetchPromise = Promise.resolve( {
            json: mockJsonPromise,
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);  
        const utils = render(<Calculator />);
        fireEvent.click(utils.getByText('7'));
        fireEvent.click(utils.getByText('3'));
        fireEvent.click(utils.getByText('1'));
        fireEvent.click(utils.getByText(/Delete/i));
        expect(utils.getByLabelText(/question/i)).toHaveDisplayValue('73');
  });