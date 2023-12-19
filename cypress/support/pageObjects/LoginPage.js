class LoginPage {

  errorMessage() {
    return cy.get('[data-test="error"]');
  }

  errorMessageCloseButton() {
    return this.errorMessage().get('.error-button');
  } 


  loginButton() {
    return cy.get('[data-test="login-button"]');
  }

  passwordField() {
    return cy.get('[data-test="password"]');
  }

  userNameField() {
    return cy.get('[data-test="username"]');
  }


  login(userName, password) {
    this.userNameField().type(userName);
    this.passwordField().type(password);
    this.loginButton().click();
  }
}

export default LoginPage;
