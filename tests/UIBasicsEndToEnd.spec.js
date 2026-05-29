const {test,expect} = require('@playwright/test');

test('Assignemet 1',async function({page})
{
   const email = "umajagiv91@gmail.com";
   const userName = page.locator('#userEmail');
   const passWord = page.locator('#userPassword');
   const loginBtn = page.locator("[value='Login']");
   const cardTitle  = page.locator('.card-body b');
   const products = page.locator(".card-body");
   const productName = "ZARA COAT 3";

   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   console.log (await page.title());
   await userName.type(email);
   await passWord.type("Vedant@123");
   await loginBtn.click();

  // await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
   const allTitles = await cardTitle.allTextContents();
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

    //await page.locator("input[@type='text']").type("Vedant Umajagi");
    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
    
    await page.locator(".action__submit").click();

    expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
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