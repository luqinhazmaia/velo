import { test as base } from '@playwright/test';
import { LandingPage } from '../pages/landing.page';
import { OrderLookupPage } from '../pages/order-lookup.page';
import { ConfiguratorPage } from '../pages/configurator.page';
import { OrderPage } from '../pages/order.page';
import { SuccessPage } from '../pages/success.page';

type PagesFixtures = {
  landingPage: LandingPage;
  orderLookupPage: OrderLookupPage;
  configuratorPage: ConfiguratorPage;
  orderPage: OrderPage;
  successPage: SuccessPage;
};

export const test = base.extend<PagesFixtures>({
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  orderLookupPage: async ({ page }, use) => {
    await use(new OrderLookupPage(page));
  },
  configuratorPage: async ({ page }, use) => {
    await use(new ConfiguratorPage(page));
  },
  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },
  successPage: async ({ page }, use) => {
    await use(new SuccessPage(page));
  },
});

export { expect } from '@playwright/test';
