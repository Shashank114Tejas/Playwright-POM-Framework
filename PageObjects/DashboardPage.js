class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.cardTitles = page.locator("div.card-body>h5");
    this.products = page.locator("div.card-body");
    this.cartIcon = page.locator("button[routerlink*='cart']");
  }

  async addProductTocartByName(productName) {
    await this.products.last().locator("i[class*='cart']").waitFor();
    const count = await this.products.count();

    console.log(await this.cardTitles.allTextContents());

    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName ) {
          await this.products.nth(i).locator("i[class*='cart']").click();
          break;
      }
    }
   
    }
    
    async navigateToCart() {   
      await this.cartIcon.click();
      await this.page.locator("div li").first().waitFor();
    }
}
export { DashboardPage };
