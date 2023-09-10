//Login UI->.json
//test browser-> .json,cart order, orderdetails, orderhistory
import { test, expect } from "@playwright/test";

let webContext;
const email = "shashank.kumar114@gmail.com";
const password = "abcxyz1234@A";

//This technique will login first and store a session storage for you and later on we can inject that data in our program
//alternative of webAPI injection choose based upon the project requirement
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const usernameFeild = page.locator("#userEmail");
  const passwordFeild = page.locator("#userPassword");
  const loginBtn = page.locator("#login");

  await page.goto("https://rahulshettyacademy.com/client/");
  await usernameFeild.fill(email);
  await passwordFeild.fill(password);
  await loginBtn.click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("valid login and Add product to cart", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");

  const cartIcon = page.locator("button[routerlink*='cart']");

  const cardTitles = page.locator("div.card-body>h5");
  const products = page.locator("div.card-body");
  const productName = "iphone 13 pro";
  await products.last().locator("i[class*='cart']").waitFor();
  const count = await products.count();

  console.log(await cardTitles.allTextContents());

  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("i[class*='cart']").click();
    }
  }

  const successMsg = await page
    .locator("div[aria-label*='Added To Cart']")
    .textContent();
  expect(successMsg).toEqual(" Product Added To Cart ");

  await cartIcon.click();

  await page.locator("div li").first().waitFor();

  const flag = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  expect(flag).toBeTruthy();

  await page.locator("li.totalRow button").click();

  //checkout page
  await page.locator("div[class*='payment__title']").last().waitFor();
  await page.locator("select[class='input ddl']").first().selectOption("11");
  await page.locator("select[class='input ddl']").last().selectOption("31");
  await page.locator("div.field.small input[type='text']").first().fill("344");
  await page
    .locator("div.field input[class='input txt']")
    .last()
    .type("Shashank", { delay: 100 });
  await page
    .locator("input[placeholder='Select Country']")
    .type("ind", { delay: 100 });
  const dropdown = page.locator("section[class*='ta-results']");
  await dropdown.waitFor();

  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    if ((await dropdown.locator("button").nth(i).textContent()) === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  const placeOrderBtn = page.locator("[class*='action__submit']");

  const shippingInfoLabelEmail = await page
    .locator("div.user__name.mt-5>label")
    .textContent();
  expect(shippingInfoLabelEmail).toEqual(email);
  await placeOrderBtn.click();
  await page.locator("h1").waitFor();

  const orderId = await page
    .locator("td[class=em-spacer-1] label")
    .last()
    .textContent();
  console.log(orderId);

  // | 64e0cfad753efa4657e9416a |
  const orderID = orderId.split(" ")[2];
  console.log(orderID);

  const ordersBtn = page.locator("button[routerlink*='myorders']");
  await ordersBtn.click();

  await page.locator("h1").waitFor();
  const orders = page.locator("tr[class='ng-star-inserted']");
  const ordersCount = await orders.count();

  console.log(ordersCount);

  for (let i = 0; i < ordersCount; i++) {
    if ((await orders.nth(i).locator("th").textContent()) === orderID) {
      await orders.nth(i).locator("td>button").first().click();
      break;
    }
  }
});
