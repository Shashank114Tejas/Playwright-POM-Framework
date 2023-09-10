class MyOrdersPage {

    constructor(page) {
        this.page = page;
        this.ordersList = page.locator("tr[class='ng-star-inserted']");
    }
    
    async verifyOrderAndClickOnViewProductBtn(orderID) {
        const ordersCount = await this.ordersList.count();
  
        for (let i = 0; i < ordersCount; i++) {
            if ((await this.ordersList.nth(i).locator("th").textContent()) === orderID) {
                await this.ordersList.nth(i).locator("td>button").first().click();
                break;
            }
        }
    }
}
export { MyOrdersPage };