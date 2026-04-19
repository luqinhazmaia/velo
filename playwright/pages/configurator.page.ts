import type { Page } from '@playwright/test';
import { BasePage } from './base.page';

/** IDs de cor no app — {@link src/components/configurator/ConfigPanel.tsx} `color-option-*` */
export type ExteriorColorId = 'glacier-blue' | 'midnight-black' | 'lunar-white';

export type WheelTypeId = 'aero' | 'sport';

/** Checkboxes em {@link src/components/configurator/ConfigPanel.tsx} `opt-*`. */
export type OptionalCheckboxTestId = 'opt-precision-park' | 'opt-flux-capacitor';

/** Rota `/configure` — {@link src/pages/Configurator.tsx} */
export class ConfiguratorPage extends BasePage {
  protected readonly path = '/configure';

  constructor(page: Page) {
    super(page);
  }

  /** Container da seção “Cor” (3 swatches dentro). Para clicar numa cor, use `colorOption`. */
  get sectionCores() {
    return this.page.getByTestId('section-cores');
  }

  /** Uma das 3 cores — `data-testid="color-option-${id}"`. */
  colorOption(colorId: ExteriorColorId) {
    return this.page.getByTestId(`color-option-${colorId}`);
  }

  get sectionRodas() {
    return this.page.getByTestId('section-rodas');
  }

  /** Aero ou Sport — `data-testid="wheel-option-${type}"`. */
  wheelOption(wheelType: WheelTypeId) {
    return this.page.getByTestId(`wheel-option-${wheelType}`);
  }

  get sectionOpcionais() {
    return this.page.getByTestId('section-opcionais');
  }

  get totalPrice() {
    return this.page.getByTestId('total-price');
  }

  get checkoutButton() {
    return this.page.getByTestId('checkout-button');
  }

  get carExteriorImage() {
    return this.page.getByTestId('car-exterior-image');
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /** Garante o estado desejado do opcional (Radix Checkbox — `data-state`). */
  async ensureOptional(testId: OptionalCheckboxTestId, enabled: boolean): Promise<void> {
    const box = this.page.getByTestId(testId);
    const state = await box.getAttribute('data-state');
    const isOn = state === 'checked';
    if (enabled !== isOn) {
      await box.click();
    }
  }
}
