import {Page, expect,Locator} from '@playwright/test';

export class DashboardPage {

    page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    toastMessage: Locator;
    loading: Locator;


    constructor(page:Page) {

        this.page = page;

        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");

        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");

        this.toastMessage = page.locator("#toast-container");
        this.loading = page.locator(".ng-animating");
    }

    async searchProductAddCart(productName:String) {

        // Wait for products to load
        await this.products.first().waitFor();

        // Print all product titles
        const titles = await this.productsText.allTextContents();
        console.log("Available Products :", titles);

        const count = await this.products.count();

        for (let i = 0; i < count; ++i) {

            const productText:any = await this.products.nth(i).locator("b").textContent();
            console.log("Checking Product :", productText);

            // Case-insensitive comparison
            if (productText.trim().toLowerCase() === productName.toLowerCase()) {

                console.log("Product Matched");

                // Click Add To Cart
                await this.products
                    .nth(i)
                    .locator("button:has-text('Add To Cart')")
                    .click();

                // Wait for toast message
                await this.toastMessage.waitFor();

                // Wait for loader disappear
                //await this.loading.waitFor({ state: "hidden" });

                console.log("Product Added To Cart");

                break;
            }
        }
    }

    async navigateToOrders() {

        await this.orders.click();
    }

    async navigateToCart() {

        await this.cart.click();
    }
}

module.exports = { DashboardPage };