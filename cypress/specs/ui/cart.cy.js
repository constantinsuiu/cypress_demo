/// <reference types="cypress" />
import * as faker from '@faker-js/faker';
import CartPage from '../../support/pageObjects/CartPage';
import InventoryPage from '../../support/pageObjects/InventoryPage';
import LoginPage from '../../support/pageObjects/LoginPage';
import constants from '../../support/constants';
import users from '../../fixtures/users.json';
const cartPage = new CartPage();
const inventoryPage = new InventoryPage();
const loginPage = new LoginPage();
const validUser = users.find(user => user.type === 'valid');

describe('Validate inventory page functionality', () => {
  beforeEach(() => {
    cy.session('login', () => {
      cy.visit('');
      loginPage.login(validUser.username, constants.password);
      inventoryPage.title().should('have.text', 'Products');
    });
    cy.visit('/inventory.html', {failOnStatusCode: false});
  });

  it('Validate successfull purchase', () => {
    let itemsInCartCount = 0;
    let text, price;

    inventoryPage.inventoryItems().then(($items) => {
      const selectedItem =  Cypress._.random(0, $items.length - 1);

      cy.wrap($items.eq(selectedItem)).then(($item) => {
        //Add item to cart
        inventoryPage.addToCart($item);
        itemsInCartCount++;
        text = inventoryPage.getItemName($item).text();
        price = inventoryPage.getItemPrice($item).text().replace('$', '');

        //Check cart icon
        inventoryPage.shippingCartBadge().should('have.text', itemsInCartCount);
        const taxAmount = parseFloat(+(Math.round(price / constants.taxAmount + 'e+2')  + 'e-2')).toFixed(2);
        const total = parseFloat(price) + parseFloat(taxAmount);

        cartPage.shoppingCart().click();
        cartPage.cartItems().should('exist').should('have.length', itemsInCartCount);
        cartPage.getCartItemName(cartPage.cartItems().eq(0)).should('have.text', text);
        cartPage.checkoutButton().click();
        cartPage.firstNameInput().type(faker.faker.person.firstName());
        cartPage.lastNameInput().type(faker.faker.person.lastName());
        cartPage.postalCodeInput().type(faker.faker.location.zipCode());
        cartPage.continueButton().click();
        cartPage.subTotalLabel().should('contain', price);
        cartPage.taxLabel().should('contain', taxAmount);
        cartPage.totalLabel().should('contain', `${total.toFixed(2)}`);
      });
    });
  });
});
