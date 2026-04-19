import type { Page } from '@playwright/test';
import { BasePage } from './base.page';

export type CheckoutPersonalData = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  cpf: string;
};

/** Rota `/order` — checkout / criação de pedido — {@link src/pages/Order.tsx} + `createOrder` em useOrders */
export class OrderPage extends BasePage {
  protected readonly path = '/order';

  constructor(page: Page) {
    super(page);
  }

  get inputName() {
    return this.page.getByTestId('checkout-name');
  }

  get inputSurname() {
    return this.page.getByTestId('checkout-surname');
  }

  get inputEmail() {
    return this.page.getByTestId('checkout-email');
  }

  get inputPhone() {
    return this.page.getByTestId('checkout-phone');
  }

  get inputCpf() {
    return this.page.getByTestId('checkout-cpf');
  }

  get storeSelectTrigger() {
    return this.page.getByTestId('checkout-store');
  }

  get paymentAvista() {
    return this.page.getByTestId('payment-avista');
  }

  get paymentFinanciamento() {
    return this.page.getByTestId('payment-financiamento');
  }

  get inputEntryValue() {
    return this.page.getByTestId('input-entry-value');
  }

  get checkboxTerms() {
    return this.page.getByTestId('checkout-terms');
  }

  get submitButton() {
    return this.page.getByTestId('checkout-submit');
  }

  get summaryTotalPrice() {
    return this.page.getByTestId('summary-total-price');
  }

  async fillPersonalData(data: CheckoutPersonalData): Promise<void> {
    await this.inputName.fill(data.name);
    await this.inputSurname.fill(data.surname);
    await this.inputEmail.fill(data.email);
    await this.inputPhone.fill(data.phone);
    await this.inputCpf.fill(data.cpf);
  }

  async selectStore(storeLabel: string): Promise<void> {
    await this.storeSelectTrigger.click();
    await this.page.getByRole('option', { name: storeLabel }).click();
  }

  async selectPaymentAvista(): Promise<void> {
    await this.paymentAvista.click();
  }

  async selectPaymentFinanciamento(): Promise<void> {
    await this.paymentFinanciamento.click();
  }

  async fillEntryValue(value: number): Promise<void> {
    await this.inputEntryValue.fill(String(value));
  }

  async acceptTerms(): Promise<void> {
    const state = await this.checkboxTerms.getAttribute('data-state');
    if (state !== 'checked') {
      await this.checkboxTerms.click();
    }
  }

  async submitOrder(): Promise<void> {
    await this.submitButton.click();
  }
}
