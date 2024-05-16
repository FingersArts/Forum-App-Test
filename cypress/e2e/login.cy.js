/* eslint-disable no-undef */
/**
 * - SignIn spec
 *   - should display SignIn page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signin');
  });

  it('should display login page correctly', () => {
    // Assert
    cy.get('input[placeholder="Your email..."]').should('be.visible');
    cy.get('input[placeholder="Your password..."]').should('be.visible');
    cy.get('button').contains('Sign In').should('be.visible');
  });

  it('should display alert when username is empty', () => {
    // Action
    cy.get('button').contains('Sign In').click();
    // Assert
      cy.on('window:alert', (str) => {
        expect(str).to.equal('"email" is not allowed to be empty');
      });
  })

  it('should display alert when password is empty', () => {
    // Arrange
    cy.get('input[placeholder="Your email..."]').type('testUsernamehahahainitest@yahoo.com');
    // Action
    cy.get('button').contains('Sign In').click();
    // Assert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // Arrange
    cy.get('input[placeholder="Your email..."]').type('testUsernamehahahainitest@yahoo.com');
    cy.get('input[placeholder="Your password..."]').type('password');
    // Action
    cy.get('button').contains('Sign In').click();
    // Assert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage (with dispalyed create thread button and sign out button', () => {
    // Arrange
    cy.get('input[placeholder="Your email..."]').type('userfortest@yahoo.com');
    cy.get('input[placeholder="Your password..."]').type('userfortest');
    // Action
    cy.get('button').contains('Sign In').click();
    // Assert
    cy.get('h1').contains('Threads').should('be.visible');
    cy.get('a').contains('Create Thread').should('be.visible');
  });
});