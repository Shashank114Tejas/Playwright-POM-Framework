class MyCartPage{

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.checkoutBtn= page.locator("li.totalRow button")
    }

    async navigateToCheckoutPage() {
        await this.checkoutBtn.click();
        await this.page.locator("div[class*='payment__title']").last().waitFor();

    }

}
export { MyCartPage };