import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Rota `/lookup` — consulta `orders` via {@link src/hooks/useOrders.ts} `getOrderByNumber`
 * (Supabase `order_number`).
 */
export class OrderLookupPage extends BasePage {
  protected readonly path = '/lookup';

  constructor(page: Page) {
    super(page);
  }

  private get searchOrderIdInput() {
    return this.page.getByTestId('search-order-id');
  }

  private get searchOrderButton() {
    return this.page.getByTestId('search-order-button');
  }

  private get orderResultId() {
    return this.page.getByTestId('order-result-id');
  }

  private get orderResultStatus() {
    return this.page.getByTestId('order-result-status');
  }

  async expectSearchFormVisible(): Promise<void> {
    await expect(this.searchOrderIdInput).toBeVisible();
  }

  async searchOrder(orderNumber: string): Promise<void> {
    await this.searchOrderIdInput.fill(orderNumber);
    await this.searchOrderButton.click();
  }

  async expectOrderFound(orderId: string, status: string): Promise<void> {
    await expect(this.orderResultId).toContainText(orderId);
    await expect(this.orderResultStatus).toContainText(status);
  }

  async expectOrderNotFound(): Promise<void> {
    await expect(this.page.locator('#root')).toContainText('Pedido não encontrado');
  }
}
