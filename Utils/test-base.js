const base  = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "umajagiv91@gmail.com",
            password: "Vedant@123",
            productName: "ZARA COAT 3"
        }
    }

)