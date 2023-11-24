class InventoryPage {
  constructor() {
    this.addToCartButton = '[data-test^="add-to-cart"]';
    this.inventoryItems = '.inventory_item';
    this.itemsName = '.inventory_item_name';
    this.itemsPrice = '.inventory_item_price';
    this.removeFromCard = '[data-test^="remove-sauce-labs"]';
    this.shippingCartBadge = '.shopping_cart_badge';
    this.sortDropdown = '[data-test="product_sort_container"]';
    this.title = '.title';
  }


  validateSorting(sortingOption, sortFn) {
    const mapFn = ($items) => [...$items].map(item => item.innerText);

    cy.get(this.itemsName)
      .then(mapFn)
      .then(unsertedItemNames => {
        const expectedSortedItemNames = [...unsertedItemNames.sort(sortFn)];

        ['hilo', 'za'].includes(sortingOption) && expectedSortedItemNames.reverse();

        cy.get(this.sortDropdown)
          .get('option')
          .should('have.length', 4);
        cy.get(this.sortDropdown)
          .select(sortingOption);
        cy.get(this.itemsName)
          .then(mapFn)
          .should(sortedItemNames => {
            expect(sortedItemNames).to.deep.equal(expectedSortedItemNames);
          });
      });
  }
}

export default InventoryPage;
