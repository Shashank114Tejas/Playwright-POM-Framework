class OrderConfirmationPage {
    /**
       * @param {import('@playwright/test').Page} page
       */
    
    constructor(page) {
        this.page = page;
        this.orderIdLabel = page.locator("td[class=em-spacer-1] label")
        this.orderLink=page.locator("button[routerlink*='myorders']");
    }


    async getOrderID() {
        const orderId = await
            this.orderIdLabel.last().textContent();
        return orderId;

      
    }
    async navigateToOrdersPage() {
        await this.orderLink.click();
        await this.page.locator("h1").waitFor();
    }
}
export { OrderConfirmationPage };