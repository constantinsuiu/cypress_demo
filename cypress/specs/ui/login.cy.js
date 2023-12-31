import LoginPage from '../../support/pageObjects/LoginPage';
import users from '../../fixtures/users.json';
import constants from '../../support/constants';
const loginPage = new LoginPage();


describe('Validating the login functionality with different users', () => {
  beforeEach(() => {
    cy.visit('', {failOnStatusCode: false});
    cy.title().should('eq', 'Swag Labs');
  });

  users.forEach(user => {
    it(`Login app with a ${user.type} user`, () => {
      loginPage.login(user.username, constants.password);

      switch (user.type) {
        case 'invalid':
        case 'lockedOut':
          loginPage.errorMessage().should('have.text', constants.loginErrors[user.type]);
          loginPage.userNameField().next().should('be.visible').and('have.attr', 'data-icon');
          loginPage.passwordField().next().should('be.visible').and('have.attr', 'data-icon');
          loginPage.errorMessageCloseButton().click();
          loginPage.errorMessage().should('not.exist');
          break;
        case 'valid':
          cy.url().should('include', 'inventory');
          break;
        default:
          throw new Error(`Unkown user type: ${user.type}`);
      } 
    });
  });
});
