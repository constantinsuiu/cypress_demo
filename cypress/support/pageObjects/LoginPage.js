class LoginPage {
  constructor() {
    this.errorMessage = '[data-test="error"]';
    this.errorMessageCloseButton = '.error-button';
    this.loginButton = '[data-test="login-button"]';
    this.passwordField = '[data-test="password"]';
    this.userNameField = '[data-test="username"]';
  }


  login(userName, password) {
    cy.get(this.userNameField).type(userName);
    cy.get(this.passwordField).type(password);
    cy.get(this.loginButton).click();
  }
}

export default LoginPage;
