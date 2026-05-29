import { Page, expect, Locator } from '@playwright/test';

export class CartPage {

    page: Page;
    cartProducts: Locator;
    checkout: Locator;

    constructor(page: Page) {

        this.page = page;
        this.cartProducts = page.locator(".cartSection h3");
        this.checkout = page.locator("text=Checkout");
    }
    async VerifyProductIsDisplayed(productName: string) {
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
    getProductLocator(productName: string) {
        return this.page.locator(
            `h3:has-text("${productName}")`
        );
    }
}
module.exports = { CartPage };