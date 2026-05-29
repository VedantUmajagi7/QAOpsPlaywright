const { test, expect } = require('@playwright/test');

test('Login Successfully', async ({ page }) => {

    await page.goto("https://eventhub.rahulshettyacademy.com/login/");
    console.log(await page.title());
    await page.getByPlaceholder("you@email.com").fill("umajagiv91@gmail.com");
    await page.locator("#password").fill("Ved@9890");
    await page.locator("#login-btn").click();
    expect(page.locator("#nav-events")).toBeVisible();
    
    await page.locator("#nav-events").click();

    function futureDateValue(days = 5) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 16);
}
});