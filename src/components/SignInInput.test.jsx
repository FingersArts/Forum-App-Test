/**
 * skenario testing
 *
 * - SignInInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call SignIn function when SignIn button is clicked
 */

import { describe, it, expect, afterEach, vi, } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react'; // Import render from @testing-library/react
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import SignInInput from './SignInInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render( // Use render from @testing-library/react
      <BrowserRouter>
        <SignInInput onSignIn={() => {}} />
      </BrowserRouter>
    );
    const emailInput = await screen.getByPlaceholderText('Your email...');

    // Action
    await userEvent.type(emailInput, 'emailtest');

    // Assert
    expect(emailInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render( // Use render from @testing-library/react
      <BrowserRouter>
        <SignInInput onSignIn={() => {}} />
      </BrowserRouter>
    );
    const passwordInput = await screen.getByPlaceholderText('Your password...');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call SignIn function when SignIn button is clicked', async () => {
    const mockSignIn = vi.fn(); // Create a mock function
    render(
      <BrowserRouter>
        <SignInInput onSignIn={mockSignIn} /> {/* Pass the mock function as prop */}
      </BrowserRouter>
    );
    const emailInput = await screen.getByPlaceholderText('Your email...');
    await userEvent.type(emailInput, 'emailtest');
    const passwordInput = await screen.getByPlaceholderText('Your password...');
    await userEvent.type(passwordInput, 'passwordtest');
    const signInButton = await screen.getByRole('button', { name: 'Sign In' });
    await userEvent.click(signInButton);
    expect(mockSignIn).toHaveBeenCalledWith({ // Ensure that the mock function was called with the correct arguments
      email: 'emailtest',
      password: 'passwordtest',
    });
  });
});