import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InputSearch } from './InputSearch';

describe('<InputSearch />', () => {
    let setup;

    beforeEach(() => {
        setup = () => {
            const mockOnChange = jest.fn(), mockOnKeyDown = jest.fn();

            const utils = render(<InputSearch
                placeholder="Type to search"
                onChange={mockOnChange}
                onKeyDown={mockOnKeyDown} />,
            );
            const input = utils.getByPlaceholderText('Type to search') as HTMLInputElement;

            return {
                input,
                mockOnChange,
                mockOnKeyDown,
                ...utils,
            }
        }
    })

    it('should change the value on input search', () => {
        const { input, mockOnChange } = setup()

        fireEvent.change(input, { target: { value: 'react issues' } })
        expect(input.value).toBe('react issues')
        expect(mockOnChange.mock.calls.length).toEqual(1);
    });

    it('should trigger arrow down and up', () => {
        const { input, mockOnKeyDown } = setup()

        fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' })
        expect(mockOnKeyDown.mock.calls.length).toEqual(1);
    });
});
