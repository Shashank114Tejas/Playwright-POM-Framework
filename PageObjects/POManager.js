import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { MyCartPage } from './MyCartPage';
import { CheckoutPage } from './CheckoutPage';
import { OrderConfirmationPage } from './OrderConfirmationPage';
import { MyOrdersPage } from './MyOrdersPage';


class POManager{
/**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.myCartPage=new MyCartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.myOrdersPage=new MyOrdersPage(this.page);
        
 
    }

     getLoginPage() {
       return this.loginPage 
    }
    getDashBoardPage() {
        return this.dashboardPage
    }
    getMycartPage() {
        return this.myCartPage
    }
    getCheckoutPage() {
        return this.checkoutPage
    }
    getOrderconfirmationPage() {
        return this.orderConfirmationPage
    }
    getMyOrdersPage() {
        return this.myOrdersPage
    }
}
export { POManager };
