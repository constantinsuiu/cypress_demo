import InventoryPage from '../support/pageObjects/InventoryPage';
import LoginPage from '../support/pageObjects/LoginPage';
import constants from '../support/constants';
import users from '../fixtures/users.json';
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

  it('Validate Z to A sorting', () => {
    inventoryPage.validateSorting('za');
  });

  it('Validate A to Z sorting', () => {
    inventoryPage.validateSorting('az');
  });

  it('Validate Price High - Low sorting', () => {
    const sortFn = (a, b) => parseFloat(a) - parseFloat(b);
    inventoryPage.validateSorting('hilo', sortFn);
  });

  it('Validate Price Low - High sorting', () => {
    const sortFn = (a, b) => parseFloat(a) - parseFloat(b);
    inventoryPage.validateSorting('lohi', sortFn);
  });

  it('Validate add to cart', () => {
    let itemsInCartCount = 0;

    inventoryPage.inventoryItems().then(($items) => {
      const selectedItem =  Cypress._.random(0, $items.length - 1);

      cy.wrap($items.eq(selectedItem)).then(($item) => {
        inventoryPage.addToCart($item);
        itemsInCartCount++;
        inventoryPage.shippingCartBadge().should('have.text', itemsInCartCount);
        inventoryPage.removeFromCard($item);
        itemsInCartCount--;
        inventoryPage.shippingCartBadge().should('not.exist');
      });
    });
  });
});
