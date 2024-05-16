/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call Register function when Register button is clicked
 */

import { describe, it, expect, afterEach, vi, } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react'; // Import render from @testing-library/react
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render( // Use render from @testing-library/react
      <BrowserRouter>
        <RegisterInput onRegister={() => {}} />
      </BrowserRouter>
    );
    const nameInput = await screen.getByPlaceholderText('Your name...');

    // Action
    await userEvent.type(nameInput, 'nametest');

    // Assert
    expect(nameInput).toHaveValue('nametest');
  });
  
  it('should handle email typing correctly', async () => {
    // Arrange
    render( // Use render from @testing-library/react
      <BrowserRouter>
        <RegisterInput onRegister={() => {}} />
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
        <RegisterInput onRegister={() => {}} />
      </BrowserRouter>
    );
    const passwordInput = await screen.getByPlaceholderText('Your password...');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call Register function when Register button is clicked', async () => {
    const mockRegister = vi.fn(); // Create a mock function
    render(
      <BrowserRouter>
        <RegisterInput onRegister={mockRegister} /> {/* Pass the mock function as prop */}
      </BrowserRouter>
    );
    const nameInput = await screen.getByPlaceholderText('Your name...');
    await userEvent.type(nameInput, 'testname');
    const emailInput = await screen.getByPlaceholderText('Your email...');
    await userEvent.type(emailInput, 'testemail@example.com');
    const passwordInput = await screen.getByPlaceholderText('Your password...');
    await userEvent.type(passwordInput, 'testpassword');
    const registerButton = await screen.getByRole('button', { name: 'Register' }); // Assuming the button text is 'Register'
    await userEvent.click(registerButton);
    expect(mockRegister).toHaveBeenCalledWith({ // Ensure that the mock function was called with the correct arguments
      name: 'testname',
      email: 'testemail@example.com',
      password: 'testpassword',
    });
  });
});