import { test, expect } from "@playwright/test";

test("test without browser fixture", async ({ page }) => {
  await page.goto("https://google.com/");
  const title = await page.title();
  await expect(page).toHaveTitle(title);
});
test("My first playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const usernameFeild = page.locator("#username");
  const passwordFeild = page.locator("[name=password]");
  const signInBtn = page.locator("#signInBtn");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  await expect(page).toHaveTitle(title);
  await usernameFeild.type("rahulshetty");
  await passwordFeild.type("learning");
  await signInBtn.click();
  const errorMsg = await page.locator("[style*='block']").textContent();
  console.log(errorMsg);
  await page.locator("[style*='block']").waitFor({state:'visible'})
  expect(errorMsg).toEqual("Incorrect username/password.");
  await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //partial text assertion
});

test("radioBtn and dropdown selection", async ({ page }) => {
  const cardTitles = page.locator("[class*='col-lg-9'] h4>a");
  const userRadioBtn = page.locator(".radiotextsty").last();
  const dropdown = page.locator("select.form-control");
  const usernameFeild = page.locator("#username");
  const passwordFeild = page.locator("[name=password]");
  const signInBtn = page.locator("#signInBtn");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await usernameFeild.fill("");
  await usernameFeild.fill("rahulshettyacademy");
  await passwordFeild.type("learning");
  await userRadioBtn.click();
  expect(userRadioBtn).toBeChecked();
  const flag = await userRadioBtn.isChecked();
  expect(flag).toBeTruthy();
  await page.locator("#okayBtn").click();
  await dropdown.selectOption("Consultant");
  await expect(page.locator("[class='blinkingText']")).toHaveAttribute("class","blinkingText");
  await signInBtn.click();
  //expect(awaitcardTitles.first().textContent()).toEqual('iphone X')
  expect(await cardTitles.nth(0).textContent()).toEqual("iphone X");
  console.log(await cardTitles.allTextContents());
});

test("Handling child windows", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const usernameFeild = page.locator("#username");
  const blinkingLink = page.locator("[class='blinkingText']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(blinkingLink).toHaveAttribute("class", "blinkingText");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    await blinkingLink.click(),
  ]);
  await newPage.waitForLoadState();
  console.log(await newPage.title());
  const text = await newPage.locator("p[class*='red']  a").textContent();
  const username = text.split("@")[1].split(".")[0];
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await usernameFeild.fill("");
    await usernameFeild.fill(username);
});




