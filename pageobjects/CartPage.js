const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {

        this.page = page;

        this.cartProducts = page.locator(".cartSection h3");

        this.checkout = page.locator("text=Checkout");
    }

    async VerifyProductIsDisplayed(productName) {

        // Wait for cart products
        await this.cartProducts.first().waitFor();

        // Verify product
        const bool = await this.getProductLocator(productName).isVisible();

        console.log("Product Visible :", bool);

        expect(bool).toBeTruthy();
    }

    async Checkout() {

        await this.checkout.click();
    }

    getProductLocator(productName) {

        return this.page.locator(
            `h3:has-text("${productName}")`
        );
    }
}

module.exports = { CartPage };