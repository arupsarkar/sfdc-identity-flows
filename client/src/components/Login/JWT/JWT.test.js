import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JWT from './JWT';

describe('<JWT />', () => {
  test('it should mount', () => {
    render(<JWT />);
    
    const jwt = screen.getByTestId('JWT');

    expect(jwt).toBeInTheDocument();
  });
});