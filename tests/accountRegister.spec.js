import { test, expect } from '@playwright/test';
import { RegisterLoginPage } from '../pageObjects/registerLoginPage';
import pageMessages from '../fixtures/pageMessages.json';
import userData from "../fixtures/userData.json";

test.describe('Register section tests', () => {
    let registerLoginPage;

    test.beforeEach(async ({ page }) => {
        registerLoginPage = new RegisterLoginPage(page);
        await page.goto('/moje-konto/');
    });

    test('Should check register / login page elements [E2E]AccountLogin/Register01', async () => {
        await Promise.all([
            registerLoginPage.pageLogo,
            registerLoginPage.primaryNavigationBar,
            registerLoginPage.searchInputField,
            registerLoginPage.priceAmount,
            registerLoginPage.rememberMe,
            registerLoginPage.loginButton,
            registerLoginPage.lostPasswordButton,
            registerLoginPage.breadcrumbs,
            registerLoginPage.productCategoriesWidget,
            registerLoginPage.demoStoreNoticeBar,
            registerLoginPage.registerEmailInput,
            registerLoginPage.registerPasswordInput,
            registerLoginPage.privacyPolicyLink,
            registerLoginPage.proceedRegisterButton,
            registerLoginPage.loginEmailInput,
            registerLoginPage.loginPasswordInput,
        ].map(element => expect(element).toBeVisible()));
        await expect(registerLoginPage.breadcrumbs).toContainText("Moje konto");
        await expect(registerLoginPage.showPasswordIcon).toHaveCount(2)
        await expect(registerLoginPage.demoStoreNoticeBar).toContainText(pageMessages.demoStoreNoticeBarContent);
    });

    test('Should check visibility of login empty fields errors, [E2E]AccountLogin/Register02', async () => {
        await (registerLoginPage.loginEmailInput).clear()
        await (registerLoginPage.loginPasswordInput).clear()
        await (registerLoginPage.loginButton).click({ force: true });
        await expect(registerLoginPage.errorMessage).toContainText(pageMessages.loginIsRequiredErrorMessage);
        await (registerLoginPage.loginEmailInput).type(userData.userIncorrect.mailAddress)
        await (registerLoginPage.loginButton).click({ force: true });
        await expect(registerLoginPage.errorMessage).toContainText(pageMessages.passwordIsRequiredErrorMessage);
    });

});

