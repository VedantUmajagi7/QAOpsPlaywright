const { test, expect } = require('@playwright/test');

// Open login page and verify the title
test('Browser Context playwright test', async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();

   // Block image loading
   // await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
   // await page.route('**/*.css', route => route.abort());

   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

   console.log(await page.title());

   await page.locator('#username').fill('rahulshettyacademy');
   await page.locator('#password').fill('Learning@830$3mK2');

   await page.locator('#signInBtn').click();

   page.on('request', request => console.log (request.url()));
   console.log('----------------------------------------------------------');
   page.on('response', response => console.log (response.url(), response.status()));


   await page.pause();
});