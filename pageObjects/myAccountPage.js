export class MyAccountPage {
    constructor(page) {
        this.page = page;

        this.entryTitle = page.locator(".entry-title");
        this.myAccountNavigation = page.locator(".woocommerce-MyAccount-navigation");
        this.myAccountContent = page.locator(".woocommerce-MyAccount-content");
    };
}
