import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OAuth from './OAuth';

describe('<OAuth />', () => {
  test('it should mount', () => {
    render(<OAuth />);
    
    const oAuth = screen.getByTestId('OAuth');

    expect(oAuth).toBeInTheDocument();
  });
});