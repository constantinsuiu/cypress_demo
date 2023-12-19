class CartPage {
  cartItems() {
    return cy.get('.cart_item');
  }
  
  checkoutButton() {
    return cy.get('[data-test="checkout"]');
  }
  
  continueButton() {
    return cy.get('[data-test="continue"]');
  }
  
  firstNameInput() {
    return cy.get('[data-test="firstName"]');
  }

  getCartItemName($item) {
    return $item.find('.inventory_item_name');
  }
  
  lastNameInput() {
    return cy.get('[data-test="lastName"]');
  }
  
  postalCodeInput() {
    return cy.get('[data-test="postalCode"]');
  }
  
  shoppingCart() {
    return cy.get('.shopping_cart_link');
  }
  
  subTotalLabel() {
    return cy.get('.summary_subtotal_label');
  }
  
  taxLabel() {
    return cy.get('.summary_tax_label');
  }
  
  totalLabel() {
    return cy.get('.summary_total_label');
  }

}

export default CartPage;
