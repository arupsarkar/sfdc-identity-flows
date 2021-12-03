import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Foo from './Foo';

describe('<Foo />', () => {
  test('it should mount', () => {
    render(<Foo />);
    
    const foo = screen.getByTestId('Foo');

    expect(foo).toBeInTheDocument();
  });
});