class CartPage {
  constructor() {
    this.cartItems = '.cart_item';
    this.cartItemName = '.inventory_item_name';
    this.checkoutbutton = '[data-test="checkout"]';
    this.continueButton = '[data-test="continue"]';
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.shoppingCart = '.shopping_cart_link';
    this.subTotalLabel = '.summary_subtotal_label';
    this.taxLabel = '.summary_tax_label';
    this.totalLabel = '.summary_total_label';
  }

}

export default CartPage;
