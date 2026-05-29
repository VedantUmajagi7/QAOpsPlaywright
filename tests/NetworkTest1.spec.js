const { test, expect } = require('@playwright/test');


test('Security test request intercept', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "umajagiv91@gmail.com";
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Vedant@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();  

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a14245017e6445667' }));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    console.log(await page.locator("p").last().textContent());
    //await page.pause();
})