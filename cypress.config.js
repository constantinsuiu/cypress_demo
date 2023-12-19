const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: true,
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/specs/**/*.cy.js',
    viewportHeight: 1800,
    viewportWidth: 2500,
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          console.log(message); //eslint-disable-line

          return null;
        }
      });
    },
    chromeWebSecurity: false
  }
});
