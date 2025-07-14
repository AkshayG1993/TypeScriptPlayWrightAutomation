import { test, expect } from '@playwright/test';
import { LoginPage } from '../pojos/LoginPage';
import { loginData} from '../dataProviders/myDataSet';
import { loginInvalidData} from '../dataProviders/myInvalidDataSet';

test.describe('Login Tests', () => {
    const baseURL = 'https://www.saucedemo.com/'; // Replace with your actual base URL
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(baseURL); // Replace with your actual login URL
  });

test.describe('Login tests with multiple valid credentials ', () => {
  loginData.forEach(({ username, password }) => {
    test(`username: ${username} and password: ${password}`, async ({ page }) => {
      await loginPage.login(username, password);
      await expect(page).toHaveURL(baseURL + 'inventory.html');
    });
  });
});

test.describe('Login tests with multiple invalid credentials ', () => {
  loginInvalidData.forEach(({ username, password ,error}) => {
    test(`username: ${username} and password: ${password}`, async ({ page }) => {
      await loginPage.login(username, password);
    await expect(page).toHaveURL(baseURL);
    // Add assertions to verify failed login, e.g., checking for an error message
    expect(await loginPage.getErrorMessage()).toEqual(error);
  });
});
});
});

