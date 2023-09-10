class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.usernameFeild = page.locator("#userEmail");
    this.passwordFeild = page.locator("#userPassword");
    this.loginBtn = page.locator("#login");
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  async validLogin(username, password) {
    await this.usernameFeild.fill(username);
    await this.passwordFeild.fill(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState("networkidle");
   
  }
}
export { LoginPage };
