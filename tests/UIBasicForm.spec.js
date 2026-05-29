const {test,expect} = require('@playwright/test');

test('Fill the form and submit',async function({page})
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    console.log (await page.title());
    
   await page.locator('form input[name="name"]').fill("Vedant Umajagi");
    //await page.getByPlaceholder("Name").fill("Vedant Umajagi");
    await page.getByPlaceholder("Password").fill("Vedant@123");

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByRole("button", { name: "Submit" }).click();
    console.log(await page.locator(".alert-success").textContent());
    await expect(page.locator(".alert-success")).toContainText("Success");
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.getByRole("link", { name: "iphone X" }).click();
    // await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();


    //await page.pause();
});

test('Fill the form',async function({page})
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log (await page.title());
    await page.getByPlaceholder("enter your passsword").fill("Vedant@123");
    await page.pause();
});