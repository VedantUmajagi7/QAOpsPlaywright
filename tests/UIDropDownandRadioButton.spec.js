const {test,expect} = require('@playwright/test');


test('Dropdown Test',async function({page})
{
   const userName = page.locator('#username');
   const passWord = page.locator('#password');
   const dropDown = page.locator("select.form-control");
   const RadioBtn = page.locator(".radiotextsty");
   const documentLink = page.locator("[href*='documents-request']");
   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log (await page.title());

    //Dropdown
    await userName.type("rahulshettyacademy");
    await passWord.type("Learning@830$3mK2");
    await dropDown.selectOption("consult");
    console.log(await dropDown.inputValue());

    //Radio Button
    await RadioBtn.nth(1).click();
    await page.locator("#okayBtn").click();
    await expect (RadioBtn.nth(1)).toBeChecked();
    console.log(await RadioBtn.nth(1).isChecked());

    //Checkbox;
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    console.log(await page.locator("#terms").isChecked());

    //Checkbox uncheck
     await page.locator("#terms").uncheck();
     expect(await page.locator("#terms").isChecked()).toBeFalsy();
    

    // Blinking Text
   
     await expect(documentLink).toHaveAttribute("class","blinkingText");
     console.log(await documentLink.getAttribute("class"));
    
     //await page.pause();
});

test('Child Window Test',async function({browser})
{
    const Context = await browser.newContext();
    const page = await Context.newPage();
    page.route('**/*.css',route => route.abort());
    

    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log (await page.title());

    const [newPage] = await Promise.all([
        Context.waitForEvent('page'),
        documentLink.click(),
    ]);

    const text = await newPage.locator(".red").textContent();
     const arrayText = text.split("@")
     const domain = arrayText[1].split(" ")[0]
     console.log(domain);
     //await expect(domain).toBe("rahulshettyacademy.com");
    await page.locator("#username").type(domain);
    await page.pause();
    console.log(await page.locator("#username").inputValue());
});

