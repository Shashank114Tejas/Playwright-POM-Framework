// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  /* Maximum time one test can run for. */
  timeout: 60* 1000,//50*1000

  expect: {

    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000//5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  //retries:1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless:false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',//retain-on-failure
    screenshot:'off'
  },

  /* Configure settings as per the requirement of the projects */
  //npx playwright test ./tests/ClientApp.spec.js --config playwright.config1.js --project=safari
  projects: [
    {
      name: 'Safari',
      use: { 
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on',
        ...devices['iPhone 13 Pro Max']
      }, 
    },
    {
        name: 'Chrome',
        use: { 
  
          browserName: 'chromium',
          headless: false,
          screenshot: 'on',
          video:'retain-on-failure',
          trace: 'off',//logs
          viewport: { width: 720, height: 720 },//customport
          ignoreHTTPSErrors: true,//https error on website ignore and advnace
          permissions:['geolocation'],//xyz wants to know your location
      }
    }
  ],
});

