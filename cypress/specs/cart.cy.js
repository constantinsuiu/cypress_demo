/// <reference types="cypress" />
import * as faker from '@faker-js/faker';
import CartPage from '../support/pageObjects/CartPage';
import InventoryPage from '../support/pageObjects/InventoryPage';
import LoginPage from '../support/pageObjects/LoginPage';
import constants from '../support/constants';
import users from '../fixtures/users.json';
const cartPage = new CartPage();
const inventoryPage = new InventoryPage();
const loginPage = new LoginPage();
const validUser = users.find(user => user.type === 'valid');

describe('Validate inventory page functionality', () => {
  beforeEach(() => {
    cy.session('login', () => {
      cy.visit('');
      loginPage.login(validUser.username, constants.password);
      cy.get(inventoryPage.title).should('have.text', 'Products');
    });
    cy.visit('/inventory.html', {failOnStatusCode: false});
  });

  it('Validate successfull purchase', () => {
    let itemsInCartCount = 0;

    cy.get(inventoryPage.inventoryItems).then((items) => {
      const selectedItem =  Cypress._.random(0, items.length - 1);

      cy.wrap(items.eq(selectedItem)).then(($item) => {
        //Add item to cart
        cy.wrap($item).find(inventoryPage.addToCartButton).click().should('not.exist');
        itemsInCartCount++;

        //Check cart icon
        cy.get(inventoryPage.shippingCartBadge).should('have.text', itemsInCartCount);
        
        //Setting up element for then action
        cy.wrap($item);
      });
    }).then(($item) => {
      const text = $item.find(inventoryPage.itemsName).text();
      const price = $item.find(inventoryPage.itemsPrice).text().replace('$', '');
      const taxAmount = parseFloat(+(Math.round(price / constants.taxAmount + 'e+2')  + 'e-2')).toFixed(2);
      const total = parseFloat(price) + parseFloat(taxAmount);

      cy.get(cartPage.shoppingCart).click();
      cy.get(cartPage.cartItems).should('exist').should('have.length', itemsInCartCount);
      cy.get(cartPage.cartItems).find(cartPage.cartItemName).should('have.text', text);
      cy.get(cartPage.checkoutbutton).click();
      cy.get(cartPage.firstNameInput).type(faker.faker.person.firstName());
      cy.get(cartPage.lastNameInput).type(faker.faker.person.lastName());
      cy.get(cartPage.postalCodeInput).type(faker.faker.location.zipCode());
      cy.get(cartPage.continueButton).click();
      cy.get(cartPage.subTotalLabel).should('contain', price);
      cy.get(cartPage.taxLabel).should('contain', taxAmount);
      cy.get(cartPage.totalLabel).should('contain', `${total.toFixed(2)}`);
    });
  });
});
