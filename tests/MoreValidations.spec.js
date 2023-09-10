import { test, expect } from "@playwright/test";

test("Popup validations", async ({ page }) => {
  //to check whether an element is present/visible on the webpage or not.
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("input[value='Hide']").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  //To handle popups // telling playwright ro listen to an event
  page.on("dialog", (dialogue) => dialogue.accept());
  await page.locator("input[value='Confirm']").click();
  //  page.on('dialog', dialogue => dialogue.dismiss());

  //mouse hover
  await page.locator("#mousehover").hover();

  //Handling Iframes
  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li>a[href*='lifetime-']:visible").click();
  console.log(await framesPage.locator("h2 span:visible").last().textContent());
});

test("screenshot and visual comparision", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#displayed-text").screenshot({ path: "partialScreenshot.png" });
  await page.locator("input[value='Hide']").click();
  await page.screenshot({path:"screenshot.png"})
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only("UI validation through screenshot comparision", async ({page}) => {
  await page.goto("https://www.google.com/");
  expect(await page.screenshot({})).toMatchSnapshot("Landing.png")
})
