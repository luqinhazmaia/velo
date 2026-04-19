import type { Page } from '@playwright/test';

/**
 * Base para Page Objects: usa `baseURL` do Playwright (`playwright.config.ts`)
 * para navegação relativa.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Rota relativa ao baseURL, ex.: `/lookup` */
  protected abstract readonly path: string;

  async open(): Promise<void> {
    await this.page.goto(this.path);
  }
}
