const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../Utils/APIUtils');
const loginPayLoad = {userEmail:"umajagiv91@gmail.com",userPassword:"Vedant@123"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayLoad = {data:[],message:"No Orders"};
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
async route=>
{
   const response = await page.request.fetch(route.request());
   let body = JSON.stringify(fakePayLoad);
   route.fulfill(
    {
        response,
        body,
    });
});
 await page.locator("button[routerlink*='myorders']").click();
 await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
 console.log(await page.locator(".mt-4").textContent());

 

});