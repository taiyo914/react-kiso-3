import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import LoginForm from '../src/assets/LoginForm';

test('LoginForm renders correctly', () => {
  render(<LoginForm />);
  
  // 基本的な要素が存在することを確認します
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});