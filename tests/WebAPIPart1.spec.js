const {test,expect} = require('@playwright/test');
let webContext;


test.beforeAll(async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator('#userEmail').fill("umajagiv91@gmail.com");
   await page.locator('#userPassword').fill("Vedant@123");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await context.storageState({ path: 'state.json' });
   webContext = await browser.newContext({ storageState: 'state.json' });
});


test('Web Client App',async function()
{
   const email = "umajagiv91@gmail.com";
    const productName = "ZARA COAT 3";
   const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   const products = page.locator(".card-body");
   const cardTitle  = page.locator('.card-body b').allTextContents();
   console.log(cardTitle);

   

   webContext.newPage();


await page.waitForLoadState('networkidle');
console.log(await page.title());
console.log(await page.url());
 await page.locator(".card-body").first().waitFor({
  state: "visible",
  timeout: 15000
});

   const allTitles = await cardTitle;
   console.log(allTitles);
   const count = await products.count();
   for(let i=0; i<count; ++i)
{
     if (await products.nth(i).locator("b").textContent() === productName)
        {
        //Add to cart
        await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
}
await page.locator("[routerlink*='cart']").waitFor({
    state: 'visible'
});
await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();

   //console.log(count);

   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; ++i)
    {
       const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

  await page.locator(".user__name input").first().fill("Vedant Umajagi");

await expect(
    page.locator(".user__name input").first()
).toHaveValue("Vedant Umajagi");

await page.locator("[placeholder='Select Country']").pressSequentially("ind");

await page.locator(".ta-results").waitFor({
    state: "visible"
});

await page.locator(".ta-results button").first().click();

await expect(
    page.locator(".hero-primary")
).toHaveText(" Thankyou for the order. ");
    console.log(await page.locator(".hero-primary").textContent());

    //await page.locator(".mt-3").click();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    
    await page.locator("button[routerlink*='myorders']").click();  
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    const rowCount = await rows.count();
    
     for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   console.log(orderIdDetails);
  
   expect(await page.locator(".email-title")).toHaveText(" order summary " );
    console.log(await page.locator(".email-title").textContent());

   expect(await page.locator(".title")).toHaveText(" ZARA COAT 3 ");
   console.log(await page.locator(".title").textContent());
   

   
    //await page.pause();
});