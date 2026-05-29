import {test as baseTest} from '@playwright/test';
interface testDataForOrder {
    username: string;
    password: string;
    productName: string;
};

export const customTest = baseTest.extend<{testDataForOrder:testDataForOrder}>(
    {
        testDataForOrder: {
            username: "umajagiv91@gmail.com",
            password: "Vedant@123",
            productName: "ZARA COAT 3"
        }
    }

)