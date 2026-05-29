const {test, expect, request} = require('@playwright/test');
const LoginPayLoad = {userEmail: "umajagiv91@gmail.com", userPassword: "Vedant@123"}
const productName = "ZARA COAT 3";
const email = "umajagiv91@gmail.com";
   //const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa"}]};
let token;
// let orderId;

test.beforeAll(async ({ request }) => {
//Login API Call
   
  //Get 

//  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
//       {
//          data: orderPayload,
//          headers: {
//             'Authorization': token,
//             "Content-Type": "application/json",
//          },
//       }
//   );
//    const orderResponseJson = await orderResponse.json();
//    console.log("Order Response =>", orderResponseJson);
//    orderId = orderResponseJson.orders[0].id;
  
});
test.beforeEach(async () => {

});

test('Client App Login', async ({ page }) => {

await page.addInitScript(value => {window.localStorage.setItem('token',value);
}, token);

 await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash',
  {
    waitUntil: 'networkidle'
  }
);
console.log("Current URL:",await page.url()
);
  console.log('Page Title:',await page.title()
  );

const products = page.locator('.card-body');
const cardTitles = page.locator('.card-body b');
await cardTitles.first().waitFor();
const allTitles = await cardTitles.allTextContents();
console.log('Available Products:', allTitles);
const count = await products.count();
   for (let i = 0; i < count; ++i) {
     const title = await products.nth(i).locator('b').textContent();
   if (title.trim() === productName) {
      console.log(`Adding Product: ${productName}`);

      await products.nth(i).locator('text=Add To Cart').click();
      await expect(page.locator('#toast-container')).toBeVisible();
      break;
    }
  }

 const cartButton = page.locator("button[routerlink='/dashboard/cart']");
 await expect(cartButton).toBeVisible({timeout: 15000});
 await cartButton.click();
await page.locator('div li').first().waitFor();

  const productVisible = await page.locator(`h3:has-text("${productName}")`).isVisible();
  expect(productVisible).toBeTruthy();
  await page.locator('text=Checkout').click();
  const countryInput = page.locator("[placeholder*='Country']");

  await countryInput.pressSequentially('ind',{delay: 100,});

  const dropdown =
    page.locator('.ta-results');

  await dropdown.waitFor();

  const options =
    dropdown.locator('button');

  const optionsCount =
    await options.count();

  for (let i = 0; i < optionsCount; ++i) {

    const text = await options
      .nth(i)
      .textContent();

    if (text.trim() === 'India') {

      await options
        .nth(i)
        .click();

      break;
    }
  }

await expect(
  page.locator(".user__name").first()
).toContainText(email);
  
  await page
    .locator('.action__submit')
    .click();


  const confirmationMessage =
    page.locator('.hero-primary');

  await expect(
    confirmationMessage
  ).toHaveText(
    ' Thankyou for the order. '
  );

  console.log(
    await confirmationMessage.textContent()
  );


  const orderId = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent();

  console.log('Order ID:', orderId);

  await page
    .locator("button[routerlink*='myorders']")
    .click();

  await page
    .locator('tbody')
    .waitFor();

  const rows =
    page.locator('tbody tr');

  const rowCount =
    await rows.count();

  for (let i = 0; i < rowCount; ++i) {

    const rowOrderId = await rows
      .nth(i)
      .locator('th')
      .textContent();

    if (orderId.includes(rowOrderId)) {

      await rows
        .nth(i)
        .locator('button')
        .first()
        .click();

      break;
    }
  }

  const orderIdDetails = await page
    .locator('.col-text')
    .textContent();

  expect(
    orderId.includes(orderIdDetails)
  ).toBeTruthy();

  console.log(
    'Order Details ID:',
    orderIdDetails
  );

  
  await expect(
    page.locator('.email-title')
  ).toHaveText(
    ' order summary '
  );

  console.log(
    await page
      .locator('.email-title')
      .textContent()
  );

  

  await expect(
    page.locator('.title')
  ).toHaveText(
    ` ${productName} `
  );

  console.log(
    await page
      .locator('.title')
      .textContent()
  );
});
