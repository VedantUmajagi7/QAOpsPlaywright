Feature: Ecommerce Valiadtions

@Regression
Scenario: Placing the Order
    Given a login to Ecommerce application with "umajagiv91@gmail.com" and "Vedant@123"
    When Add "zara coat 3" to Cart
    Then Verify "zara coat 3" is displayed in the Cart
    When Enter valid details and place the Order
    Then Verify order in present in the OrderHistory


@Validation
Scenario Outline:Login Validation
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username               |  password  |
    | umajagiv91@gmail.com   | Vedant@123 |
    | vedant@gmail.com       | Vedant@000 |

