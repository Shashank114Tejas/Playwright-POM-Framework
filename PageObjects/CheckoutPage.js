class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.expiryMonthDrp = page.locator("select[class='input ddl']").first();
    this.expiryDateDrp = page.locator("select[class='input ddl']").last();
    this.cvvFeild = page.locator("div.field.small input[type='text']").first();
    this.nameOnCardFeild = page.locator("div.field input[class='input txt']").last();
    this.selectCountryFeild = page.locator("input[placeholder='Select Country']");
    this.countrySuggestionDrp = page.locator("section[class*='ta-results']");
    this.placeOrderBtn = page.locator("[class*='action__submit']");
    this.shippingInfoLabelEmail = page.locator("div.user__name.mt-5>label");
  }

  async enterPersonalInfo(expiryMonth, expiryDate, cvv, nameoncard) {
    await this.expiryMonthDrp.selectOption(expiryMonth);
    await this.expiryDateDrp.selectOption(expiryDate);
    await this.cvvFeild.fill(cvv);
    await this.nameOnCardFeild.type(nameoncard, { delay: 100 });
  }

  async selectShippingCountryAndPlaceOrder(partialcountryName, fullcountryname, email) {
    await this.selectCountryFeild.type(partialcountryName, { delay: 100 });
    await this.countrySuggestionDrp.waitFor();
    const optionsCount = await this.countrySuggestionDrp
      .locator("button")
      .count();
    for (let i = 0; i < optionsCount; i++) {
      if (
        (await this.countrySuggestionDrp
          .locator("button")
          .nth(i)
          .textContent()) === fullcountryname
      ) {
        await this.countrySuggestionDrp.locator("button").nth(i).click();
        break;
      }
    }
    const shippingInfoLabelEmail =
      await this.shippingInfoLabelEmail.textContent();
    if (shippingInfoLabelEmail===(email)) {
      await this.placeOrderBtn.click();
      await this.page.locator("h1").waitFor();
    }
  }
}
export { CheckoutPage };
