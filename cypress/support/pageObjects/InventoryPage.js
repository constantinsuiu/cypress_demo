class InventoryPage {
  addToCart(parentElement) {
    return cy.wrap(parentElement)
      .find('[data-test^="add-to-cart"]')
      .click()
      .should('not.exist');
  }

  inventoryItems() {
    return cy.get('.inventory_item');
  }

  getItemName($item) {
    const selector = '.inventory_item_name ';
    return $item ? $item.find(selector) : cy.get(selector);
  }

  getItemPrice($item) {
    const selector = '.inventory_item_price';
    return $item ? $item.find(selector): cy.get(selector);
  }

  removeFromCard(parentElement) {
    return cy.wrap(parentElement)
      .find('[data-test^="remove-"]')
      .click()
      .should('not.exist');
  }

  shippingCartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  sortDropdown() {
    return cy.get('[data-test="product_sort_container"]');
  }

  title() {
    return cy.get('.title');
  }


  validateSorting(sortingOption, sortFn) {
    const mapFn = ($items) => [...$items].map(item => item.innerText);
    const items = ['hilo', 'lohi'].includes(sortingOption) ? this.getItemPrice : this.getItemName;
    let expectedSortedItems;
    
    items()
      .then(mapFn)
      .then(unsortedItems => {
        expectedSortedItems = [...unsortedItems.map(item => item.replace('$', '')).sort(sortFn)];
        ['hilo', 'za'].includes(sortingOption) && expectedSortedItems.reverse();
      });
    this.sortDropdown().get('option').should('have.length', 4);
    this.sortDropdown().select(sortingOption);
    items()
      .then(mapFn)
      .then(sortedItems => {
        sortedItems = sortedItems.map(item => item.replace('$', ''));
        expect(sortedItems).to.deep.equal(expectedSortedItems);
      });
  }
}

export default InventoryPage;
