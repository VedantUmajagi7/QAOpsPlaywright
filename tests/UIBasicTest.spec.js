const {test,expect} = require('@playwright/test');

//Open a Instagram login page and verify the title of the page
test.describe.configure({mode:'serial'});

test('Browser Context playwright test',async function({browser})
{
   const Context = await browser.newContext();
   const page = await Context.newPage();
   await page.goto("https://www.instagram.com/accounts/login/");
   console.log (await page.title());
      await expect(page).toHaveTitle("Instagram");

    //   await page.locator('#_r_2_').fill("7038480767");
    //   await page.locator('#_r_5_').fill("Ved@7038");
    //   await page.locator('x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np x972fbf x10w94by x1qhh985 x14e42zd x9f619 xtvsq51 xqbgfmv xbe3n85 x7a1id4 x1d9i5bo x1xila8y x1bumbmr xc8cyl1 xti2d7y').click();

});
//Open a login page and verify the error message for invalid credentials
test('Page Context playwright test',async function({page})
{
   await page.goto("https://practicetestautomation.com/practice-test-login/");
   console.log (await page.title());
   await expect(page).toHaveTitle("Test Login | Practice Test Automation");
   await page.locator('#username').fill("student");
   await page.locator('#password').type("PASS");
   await page.locator('#submit').click();
   // Two ways to verify the error message - either by text or by visibility and using class and ID locator
   //await expect(page.locator('#error')).toHaveText("Your password is invalid!");
   await expect(page.locator('.show')).toBeVisible();
   console.log(await page.locator('#error').textContent());

});

test('Page Context playwright test1',async function({page})
{
   await page.goto("https://practicetestautomation.com/practice-test-login/");
   console.log (await page.title());
   await expect(page).toHaveTitle("Test Login | Practice Test Automation");
   await page.locator('#username').fill("vedant");
   await page.locator('#password').type("Password123");
   await page.locator('#submit').click();
   // Two ways to verify the error message - either by text or by visibility and using class and ID locator
   //await expect(page.locator('#error')).toHaveText("Your username is invalid!");
   await expect(page.locator('.show')).toBeVisible();
   console.log(await page.locator('#error').textContent());

});


//Open a login page and verify the success message for valid credentials end-to-end test
test('Login Successfully',async function({page})
{
   await page.goto("https://practicetestautomation.com/practice-test-login/");
   console.log (await page.title());
   await expect(page).toHaveTitle("Test Login | Practice Test Automation");
   await page.locator('#username').fill("student");
   await page.locator('#password').type("Password123");
   await page.locator('#submit').click();
   //await expect(page.locator('.post-title')).toHaveText("Logged In Successfully");
   await expect(page.locator('.post-title')).toBeVisible();
   //await expect(page.locator('.has-text-align-center')).toHaveText("Congratulations student. You successfully logged in!");
   await expect(page.locator('.has-text-align-center')).toBeVisible();
   console.log(await page.locator('.post-title').textContent());
   console.log(await page.locator('.has-text-align-center').textContent());
   //await expect(page.locator('.wp-block-button__link has-text-color has-background has-very-dark-gray-background-color')).toBeVisible();

});
//Negative test case for login page of Rahul Shetty Academy
test('Rahul Shetty Academy',async function({page})
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log (await page.title());
   await page.locator('#username').fill("rahulshetty");
   await page.locator('#password').fill("learning");
   await page.locator('#signInBtn').click();
   //await expect(page.locator('.alert-danger')).toBeVisible();
   //await page.locator("[style*='block;']")
   console.log(await page.locator("[style*='block;']")
   .textContent());
   await page.locator("[style*='block;']").textContent("Incorrect username or password.");
   //await expect (page.locator("[style*='block;']")).toContainText("Incorrectffsd");

});

//Positive test case for login page of Rahul Shetty Academy
test('Rahul Shetty Academy Positive',async function({page})
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log (await page.title());
   await page.locator('#username').fill("rahulshettyacademy");
   await page.locator('#password').fill("Learning@830$3mK2");
   await page.locator('#signInBtn').click();
   //await(page.locator('.nav-link')).click();
});
    

//Negative to positive test case for login page of Rahul Shetty Academy
test('Rahul Shetty Academy Negative to positive',async function({page})
{
   const userName = page.locator('#username');
   const passWord = page.locator('#password');
   const signInBtn = page.locator('#signInBtn');
   const cardTitle  = page.locator('.card-body a');

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log (await page.title());
   await userName .type("rahulshetty");
   await passWord.type("learning");
   await signInBtn.click();
   //await expect(page.locator('.alert-danger')).toBeVisible();
   //await page.locator("[style*='block;']")
   console.log(await page.locator("[style*='block;']")
   .textContent());
   await page.locator("[style*='block;']").textContent("Incorrect username or password.");
   //await expect (page.locator("[style*='block;']")).toContainText("Incorrectffsd");
// Type-Fill the correct credentials and login successfully

await userName.fill("");
await passWord.fill("");

await userName.fill("rahulshettyacademy");
await passWord.fill("Learning@830$3mK2");
await signInBtn.click();
//console.log(await page.locator(".card-body a").textContent());
//console.log(await cardTitle.first().textContent());
//console.log(await page.locator(".card-body a").nth(3).textContent());
const allTitles = await cardTitle.allTextContents();
console.log(allTitles);
});