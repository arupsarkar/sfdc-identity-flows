import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Auth0 from './Auth0';

describe('<Auth0 />', () => {
  test('it should mount', () => {
    render(<Auth0 />);
    
    const auth0 = screen.getByTestId('Auth0');

    expect(auth0).toBeInTheDocument();
  });
});