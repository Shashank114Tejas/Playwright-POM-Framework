import { test } from '@playwright/test';

export const customtest = test.extend({
  testDataForOrder: {
    username: "shashank.kumar114@gmail.com",
    password: "abcxyz1234@A",
    productName: "iphone 13 pro",
  },
});
