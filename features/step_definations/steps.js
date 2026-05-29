const {When, Then, Given} = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');


    Given('a login to Ecommerce application with {string} and {string}', {timeout : 100*1000}, async function (username, password) {
        
        const loginPage = this.poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(username, password);

    });
       
       
    When('Add {string} to Cart', async function (productName) {

        this.dashboardPage = this.poManager.getDashboardPage();
        await this.dashboardPage.searchProductAddCart(productName);
        await this.dashboardPage.navigateToCart();
    });

       
    Then('Verify {string} is displayed in the Cart', async function (productName) {
    
        const cartPage = this.poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(productName);
        await cartPage.Checkout();

     });
       
 
       
    When('Enter valid details and place the Order', async function () {
        const ordersReviewPage = this.poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        this.orderId =await ordersReviewPage.SubmitAndGetOrderId();
        console.log("Order ID :", this.orderId);
     });
       

       
    Then('Verify order in present in the OrderHistory', async function () {
        await this.dashboardPage.navigateToOrders();
        const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(this.orderId);
        expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
     });

       
  Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
         
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log (await this.page.title());
        await this.page.locator('#username').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#signInBtn').click();
        console.log(username);

 });
       

       
  Then('Verify Error message is displayed', async function () {
        console.log(await this.page.locator("[style*='block;']").textContent());
        await this.page.locator("[style*='block;']").textContent("Incorrect username or password.");          
 });
       



//    //await expect(page.locator('.alert-danger')).toBeVisible();
//    //await page.locator("[style*='block;']")
//    