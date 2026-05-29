Feature: Ecommerce2 Valiadtions

@Validation
Scenario Outline:Login Validation
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username               |  password  |
    | umajagiv91@gmail.com   | Vedant@123 |
    | vedant@gmail.com       | Vedant@000 |

