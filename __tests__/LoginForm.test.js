import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
  //testing-library/jest-domのver6以降から/extend-expectは使えなくなった。
import LoginForm from '../src/assets/LoginForm';

test('LoginForm renders correctly', () => {
  render(<LoginForm />);
  
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});