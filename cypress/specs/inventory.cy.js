import InventoryPage from '../support/pageObjects/InventoryPage';
import LoginPage from '../support/pageObjects/LoginPage';
import constants from '../support/constants';
import users from '../fixtures/users.json';
const inventoryPage = new InventoryPage();
const loginPage = new LoginPage();
const validUser = users.find(user => user.type === 'valid');

describe('Validate inventory page functionality', () => {
  beforeEach(() => {
    cy.visit('', {failOnStatusCode: false});
    loginPage.login(validUser.username, constants.password);
    cy.get(inventoryPage.title).should('have.text', 'Products');
  });

  it('Validate Z to A sorting', () => {
    inventoryPage.validateSorting('za');
  });

  it('Validate A to Z sorting', () => {
    inventoryPage.validateSorting('az');
  });

  it('Validate Price High - Low sorting', () => {
    const sortFn = (a, b) => parseFloat(b) - parseFloat(a);
    inventoryPage.validateSorting('hilo', sortFn);
  });

  it('Validate Price Low - High sorting', () => {
    const sortFn = (a, b) => parseFloat(a) - parseFloat(b);
    inventoryPage.validateSorting('lohi', sortFn);
  });

  // it('Validate add to cart', () => {
  //   let itemsInCartCount = 0;

  //   cy.get(inventoryPage.inventoryItems).then((items) => {
  //     const selectedItem =  Cypress._.random(0, items - 1);

  //     // cy.get(inventoryPage.inventoryItems).eq(selectedItem).then((item) => {
  //     //   item.get(inventoryPage.addToCartButton).click();
  //     //   itemsInCartCount++;
  //     //   item.get(inventoryPage.addToCartButton).should('not.exist');
  //     //   item.get(inventoryPage.removeFromCard).should('exist');
  //     //   item.get(inventoryPage.shippingCartBadge).should('have.text', itemsInCartCount);
  //     //   item.get(inventoryPage.removeFromCard).click();
  //     //   itemsInCartCount--;
  //     //   item.get(inventoryPage.shippingCartBadge).should('not.exist');
  //     // });
  //     cy.get(inventoryPage.inventoryItems).eq(selectedItem).get(inventoryPage.addToCartButton).click();
  //     itemsInCartCount++;
  //     cy.get(inventoryPage.inventoryItems).eq(selectedItem).get(inventoryPage.addToCartButton).should('not.exist');
  //     cy.get(inventoryPage.inventoryItems).eq(selectedItem).get(inventoryPage.removeFromCard).should('exist');
  //     cy.get(inventoryPage.inventoryItems).eq(selectedItem).get(inventoryPage.shippingCartBadge).should('have.text', itemsInCartCount);
  //     cy.get(inventoryPage.inventoryItems).eq(selectedItem).get(inventoryPage.removeFromCard).click();
  //     itemsInCartCount--;
  //     cy.get(inventoryPage.inventoryItems).eq(selectedItem).get(inventoryPage.shippingCartBadge).should('not.exist');
  //   });
  // });
});
