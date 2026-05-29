import {test, expect} from '@playwright/test';
import {customTest} from '../Utils_ts/test-base';
import {POManager} from '../pageobjects_ts/POManager';

const dataSet = JSON.parse(JSON.stringify(require("../Utils_ts/placeorderTestData.json")));

for (const data of dataSet) {
    

    test(`Client App login ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");

        let orderId: any;
        orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log("Order ID :", orderId);

        // Orders History
        await dashboardPage.navigateToOrders();

        const ordersHistoryPage =
            poManager.getOrdersHistoryPage();

        await ordersHistoryPage.searchOrderAndSelect(orderId);

        expect(
            orderId.includes(
                await ordersHistoryPage.getOrderId()
            )
        ).toBeTruthy();

    });
}


customTest(`Client App login`, async ({page,testDataForOrder}) => 
    {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
});
