import { test, expect } from '@playwright/test';
import { RegisterLoginPage } from '../pageObjects/registerLoginPage';
import { MyAccountPage } from '../pageObjects/myAccountPage';
import { generateRandomEmailAddress } from '../utility/emailGenerator';
import pageMessages from '../fixtures/pageMessages.json';
import userData from "../fixtures/userData.json";

test.describe('Login / Register section tests', () => {
    let registerLoginPage;
    let myAccountPage;
    let randomEmail;

    test.beforeEach(async ({ page }) => {
        randomEmail = generateRandomEmailAddress();
        registerLoginPage = new RegisterLoginPage(page);
        myAccountPage = new MyAccountPage(page);
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
            registerLoginPage.registerButton,
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

    test('Should use wrong credentials to account, [E2E]AccountLogin/Register03', async () => {
        await (registerLoginPage.loginEmailInput).fill(userData.userCorrect.mailAddress);
        await (registerLoginPage.loginPasswordInput).fill(userData.userIncorrect.veryWeakPassword);
        await (registerLoginPage.loginButton).click();
        await expect(registerLoginPage.errorMessage).toContainText(pageMessages.wrongCredentialsErrorMessage);
    });

    test('Should login to account, [E2E]AccountLogin/Register04', async () => {
        await (registerLoginPage.loginEmailInput).fill(userData.userCorrect.mailAddress);
        await (registerLoginPage.loginPasswordInput).fill(userData.userCorrect.password);
        await (registerLoginPage.loginButton).click();
        await expect(myAccountPage.entryTitle).toContainText('Moje konto');
        await expect(registerLoginPage.loginEmailInput).not.toBeVisible();
        await expect(registerLoginPage.loginPasswordInput).not.toBeVisible();
    });

    test('Should display Very Weak password strength, [E2E]AccountLogin/Register05', async () => {
        await registerLoginPage.enterPassword(userData.userIncorrect.veryWeakPassword);

        await expect(registerLoginPage.passwordStrengthMeter)
            .toContainText(pageMessages.veryWeakPasswordMessage);
    });

    test('Should display Weak password strength, [E2E]AccountLogin/Register06', async () => {
        await registerLoginPage.enterPassword(userData.userIncorrect.weakPassword);

        await expect(registerLoginPage.passwordStrengthMeter)
            .toContainText(pageMessages.weakPasswordMessage);
    });

    test('Should display Medium password strength, [E2E]AccountLogin/Register07', async () => {
        await registerLoginPage.enterPassword(userData.userIncorrect.mediumStrengthPassword);

        await expect(registerLoginPage.passwordStrengthMeter)
            .toContainText(pageMessages.mediumStrengthPasswordMessage);
    });

    test('Should display Strong password strength, [E2E]AccountLogin/Register08', async () => {
        await registerLoginPage.enterPassword(userData.userIncorrect.strongPassword);

        await expect(registerLoginPage.passwordStrengthMeter)
            .toContainText(pageMessages.strongPasswordMessage);
    });

    test('Should register new account, [E2E]AccountLogin/Register09', async () => {
        await (registerLoginPage.registerEmailInput).fill(randomEmail);
        await (registerLoginPage.registerPasswordInput).fill(userData.userCorrect.password);
        await registerLoginPage.registerPasswordInput.press('Tab');
        await expect(registerLoginPage.registerButton).toBeEnabled();
        await (registerLoginPage.registerButton).click();
        await expect(myAccountPage.myAccountContent).toContainText(pageMessages.myAccountContent);
    });

});

