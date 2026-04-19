import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/** Rota `/success` — pós-checkout — {@link src/pages/Success.tsx} */
export class SuccessPage extends BasePage {
  protected readonly path = '/success';

  constructor(page: Page) {
    super(page);
  }

  /** Fluxo feliz com pedido aprovado — {@link src/pages/Success.tsx} `success-status`, `order-id`. */
  async expectPedidoAprovado(): Promise<void> {
    await expect(this.page.getByTestId('success-status')).toContainText('Pedido Aprovado!');
    await expect(this.page.getByTestId('order-id')).toBeVisible();
  }
}
