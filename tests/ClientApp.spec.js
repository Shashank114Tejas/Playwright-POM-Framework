import { test, expect } from "@playwright/test";
import { POManager } from "../PageObjects/POManager";
import { customtest } from "../Utils/Test-base";
//to avoid any conflicts best way to use .JSON is to first convert it into string then JS PageObjects
//JSON-->String-->JSON
const dataset = JSON.parse(
  JSON.stringify(require("../Utils/ClientAppTestData.json"))
);

for (const data of dataset) {
  test(`Valid login, Add product to cart and Place order of ${data.productName}`, async ({
    page,
  }) => {
    //login page
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);

    //DashboardPage
    const dashboardPage = poManager.getDashBoardPage(page);

    await dashboardPage.addProductTocartByName(data.productName);
    const successMsg = dashboardPage.getSuccessMsg();
    expect(successMsg).toEqual(" Product Added To Cart ");
    await dashboardPage.navigateToCart();

    //MycartPage
    const flag = await page
      .locator("h3:has-text('" + data.productName + "')")
      .isVisible();
    expect(flag).toBeTruthy();

    const mycartpage = poManager.getMycartPage();
    await mycartpage.navigateToCheckoutPage();

    //checkout page
    const checkoutpage = poManager.getCheckoutPage(page);
    await checkoutpage.enterPersonalInfo("12", "31", "355", "Shashank");
    await checkoutpage.selectShippingCountryAndPlaceOrder(
      "ind",
      " India",
      data.username
    );

    const orderconfirmationpage = poManager.getOrderconfirmationPage();
    const actualOrderID = await orderconfirmationpage.getOrderID();
    // | 64e0cfad753efa4657e9416a |
    const orderID = actualOrderID.split(" ")[2];
    console.log(orderID);

    await orderconfirmationpage.navigateToOrdersPage();

    const myorderspage = poManager.getMyOrdersPage(page);
    await myorderspage.verifyOrderAndClickOnViewProductBtn(orderID);
  });
}

customtest.only(
  "Passing test data as fixture from test base",
  async ({ page, testDataForOrder }) => {
    //login page
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(
      testDataForOrder.username,
      testDataForOrder.password
    );

    //DashboardPage
    const dashboardPage = poManager.getDashBoardPage(page);

    await dashboardPage.addProductTocartByName(testDataForOrder.productName);
    const successMsg = await page
      .locator("div[aria-label*='Added To Cart']")
      .textContent();
    expect(successMsg).toEqual(" Product Added To Cart ");
    await dashboardPage.navigateToCart();
  }
);
