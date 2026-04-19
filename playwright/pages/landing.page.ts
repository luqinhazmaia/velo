import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/** Rota `/` — {@link src/pages/Landing.tsx} */
export class LandingPage extends BasePage {
  protected readonly path = '/';

  constructor(page: Page) {
    super(page);
  }

  private get heroSection() {
    return this.page.getByTestId('hero-section');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heroSection.getByRole('heading')).toContainText('Velô Sprint');
  }

  /** Header desktop/mobile: link para `/lookup`. */
  async openConsultarPedido(): Promise<void> {
    await this.page.getByRole('link', { name: 'Consultar Pedido' }).click();
  }

  /** Hero CTA → `/configure` — {@link src/components/landing/HeroSection.tsx} `hero-cta-primary`. */
  async openConfiguratorFromHero(): Promise<void> {
    await this.page.getByTestId('hero-cta-primary').click();
    await this.page.waitForURL('**/configure');
  }
}
