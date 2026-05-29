const {test,expect} = require('@playwright/test');

test('Assignemet 1',async function({page})
{
   const email = "umajagiv91@gmail.com";
   const products = page.locator(".card-body");
   const productName = "ADIDAS ORIGINAL";

   await page.goto("https://rahulshettyacademy.com/client");
   console.log (await page.title());

   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Vedant@123");
   await page.getByRole("button", { name: "Login" }).click();
   const cardTitle  = page.locator('.card-body b');
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
//    const count = await products.count();
//    for(let i=0; i<count; ++i)
// {
//      if (await products.nth(i).locator("b").textContent() === productName)
//         {
//         //Add to cart
//         await products.nth(i).locator("text= Add To Cart").click();
//             break;
//         }
// }
   await page.locator(".card-body").filter({hasText:"ADIDAS ORIGINAL"})
   .getByRole("button", {name: " Add to Cart"}).click();

   //await page.locator("[routerlink*='cart']").click();
   await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

   await page.locator("div li").first().waitFor();

   //const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
   await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
   await page.getByRole("button", { name: "Checkout" }).click();
   await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});
   
   // const dropdown = page.locator(".ta-results");
   // await dropdown.waitFor();
   // const optionsCount = await dropdown.locator("button").count();
   //  for(let i=0; i<optionsCount; ++i)
   //  {
   //     const text = await dropdown.locator("button").nth(i).textContent();
   //      if(text === " India")
   //      {
   //          await dropdown.locator("button").nth(i).click();
   //          break;
   //      }
   //  }

    await page.getByRole("button", { name: "India" }).nth(1).click();
    await page.getByText("Place Order ").click();

    //expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
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

   expect(await page.locator(".title")).toHaveText(" ADIDAS ORIGINAL ");
   console.log(await page.locator(".title").textContent());
   

   
    //await page.pause();
});