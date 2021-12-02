import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Accounts from './Accounts';

describe('<Accounts />', () => {
  test('it should mount', () => {
    render(<Accounts />);
    
    const accounts = screen.getByTestId('Accounts');

    expect(accounts).toBeInTheDocument();
  });
});