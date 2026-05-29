import { expect, type Locator, type Page } from '@playwright/test';

let message1 : string = "Hello";
message1 = "bye";
console.log(message1);
let age1 : number = 20;
console.log(age1);
let isActive : boolean = true;
console.log(isActive);
let numbers1 : number[] = [1, 2, 3];
console.log(numbers1);
let data : string = "Thank You";
console.log(data);

function add(a:number,b:number) : number
{
    return a+b;
}
add(3,4);


let user : {name:string,age:number,location:string}= {name: "Bob", age:34, location:"Delhi"};
user.location = "Pune";
console.log(user);




// class CartPage {

//     page: Page;
//     cartProducts:Locator;
//     constructor(page:any) {

//         this.page = page;
//         this.cartProducts = page.locator(".cartSection h3");
//         this.checkout = page.locator("text=Checkout");
//     }

//     async VerifyProductIsDisplayed(productName) {

//         // Wait for cart products
//         await this.cartProducts.first().waitFor();

//         // Verify product
//         const bool = await this.getProductLocator(productName).isVisible();

//         console.log("Product Visible :", bool);

//         expect(bool).toBeTruthy();
//     }

//     async Checkout() {

//         await this.checkout.click();
//     }

//     getProductLocator(productName) {

//         return this.page.locator(
//             `h3:has-text("${productName}")`
//         );
//     }
// }

// module.exports = { CartPage };