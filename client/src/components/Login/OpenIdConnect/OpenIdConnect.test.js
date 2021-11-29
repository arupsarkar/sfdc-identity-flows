import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OpenIdConnect from './OpenIdConnect';

describe('<OpenIdConnect />', () => {
  test('it should mount', () => {
    render(<OpenIdConnect />);
    
    const openIdConnect = screen.getByTestId('OpenIdConnect');

    expect(openIdConnect).toBeInTheDocument();
  });
});