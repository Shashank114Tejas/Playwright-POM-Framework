import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../Utils/APIUtils";

const loginPayload = { userEmail: "shashank.kumar114@gmail.com", userPassword: "abcxyz1234@A" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] }
let response;


test.beforeAll( async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
 response= await apiUtils.createOrder(orderPayload);
})

test("ByPass login and Bypass Placing order just validate orderId", async ({ page }) => {

//Login Api
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

 
  await page.goto("https://rahulshettyacademy.com/client/");

  const ordersBtn = page.locator("button[routerlink*='myorders']");
  await ordersBtn.click();

  await page.locator('h1').waitFor();
  const orders = page.locator("tr[class='ng-star-inserted']")
  const ordersCount = await orders.count();

  console.log(ordersCount);

  for (let i = 0; i < ordersCount; i++){
    if (await orders.nth(i).locator("th").textContent() === response.orderId) {
      await page.pause();
      await orders.nth(i).locator("td>button").first().click(); break;
    }
  }


})