export class RegisterLoginPage {
    constructor(page) {
        this.page = page;

        this.pageLogo = page.locator(".custom-logo");
        this.primaryNavigationBar = page.locator(".storefront-primary-navigation");
        this.searchInputField = page.locator("#woocommerce-product-search-field-0");
        this.priceAmount = page.locator(".woocommerce-Price-amount");
        this.rememberMe = page.locator("#rememberme");
        this.loginButton = page.locator("[name='login']");
        this.lostPasswordButton = page.locator(".woocommerce-LostPassword");
        this.errorMessage = page.locator(".woocommerce-error"); 
        this.breadcrumbs = page.locator(".woocommerce-breadcrumb");
        this.productCategoriesWidget = page.locator(".widget_product_categories");
        this.demoStoreNoticeBar = page.locator(".woocommerce-store-notice");
        this.registerEmailInput = page.locator("#reg_email");
        this.registerPasswordInput = page.locator("#reg_password");
        this.showPasswordIcon = page.locator(".show-password-input");
        this.privacyPolicyLink = page.locator(".woocommerce-privacy-policy-link");
        this.proceedRegisterButton = page.locator("[name='register']");
        this.loginEmailInput = page.locator("#username");
        this.loginPasswordInput = page.locator("#password");

    };
}