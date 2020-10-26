import React from 'react';
import { render, screen } from '@testing-library/react';
import { InputSearch } from './InputSearch';

test('renders learn react link', () => {
    render(<InputSearch
        placeholder="Type to search"
        onChange={(e) => console.log('test')}
        onKeyDown={(e) => console.log('test')} />,
    );
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});