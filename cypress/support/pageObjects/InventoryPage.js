class InventoryPage {
  constructor() {
    this.addToCartButton = '[data-test^="add-to-cart"]';
    this.inventoryItems = '.inventory_item';
    this.itemsName = '.inventory_item_name';
    this.itemsPrice = '.inventory_item_price';
    this.removeFromCard = '[data-test^="remove-"]';
    this.shippingCartBadge = '.shopping_cart_badge';
    this.sortDropdown = '[data-test="product_sort_container"]';
    this.title = '.title';
  }


  validateSorting(sortingOption, sortFn) {
    const mapFn = ($items) => [...$items].map(item => item.innerText);
    const items = ['hilo', 'lohi'].includes(sortingOption) ? this.itemsPrice : this.itemsName;
    
    cy.get(items)
      .then(mapFn)
      .then(unsortedItems => {
        const expectedSortedItems = [...unsortedItems.map(item => item.replace('$', '')).sort(sortFn)];

        ['hilo', 'za'].includes(sortingOption) && expectedSortedItems.reverse();

        cy.get(this.sortDropdown)
          .get('option')
          .should('have.length', 4);
        cy.get(this.sortDropdown)
          .select(sortingOption);
        cy.get(items)
          .then(mapFn)
          .then(sortedItems => {
            sortedItems = sortedItems.map(item => item.replace('$', ''));
            
            expect(sortedItems).to.deep.equal(expectedSortedItems);
          });
      });
  }
}

export default InventoryPage;
