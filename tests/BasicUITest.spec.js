const { test, expect } = require('@playwright/test');

test('Basic UI Test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
    console.log('Title is correct');


    await page.locator('#dropdown-class-example').selectOption('option2');
    console.log('Option 2 is selected from dropdown');

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    console.log('Text box is hidden');

    await page.getByPlaceholder('Enter Your Name').fill("Vedant Umajagi");
    console.log('Name entered in the text box');


    page.on('dialog', dialog => dialog.accept());
    await page.locator("#alertbtn").click();


    await page.locator("#mousehover").hover();
    await page.getByRole('link', { name: 'Top' }).click();


    // await page.locator("#openwindow").click();
    // await page.waitForEvent('popup');
    // //await expect(page.getByText('qaclickacademy.com')).toBeVisible();

    await page.pause();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const courseTitle = await framesPage.locator(".text h2").textContent();
    const courseNumber = courseTitle.split(" ")[1];
    console.log('Course Title:', courseTitle);
    console.log('Course Number:', courseNumber);

});

test('Screenshot & visual comparison', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.jpg'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();
    console.log('Text box is hidden');
});

test('visual', async ({ page }) => {
  await page.goto("https://instagram.com/");
  // Focus on the login form only, not the whole dynamic page
  const loginForm = page.locator('form'); 
  expect(await loginForm.screenshot()).toMatchSnapshot('InstloginForm.png');
});
