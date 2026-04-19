import type { ConfiguratorPage } from '../pages/configurator.page';
import type { LandingPage } from '../pages/landing.page';
import type { RandomConfiguratorChoices } from '../helpers/purchase-test-data';
import { garantirHomeCarregada } from './navigation.steps';

export async function irParaConfiguratorAPartirDaHome(landing: LandingPage): Promise<void> {
  await garantirHomeCarregada(landing);
  await landing.openConfiguratorFromHero();
}

export async function aplicarConfiguracaoAleatoria(
  configurator: ConfiguratorPage,
  choices: RandomConfiguratorChoices
): Promise<void> {
  await configurator.colorOption(choices.color).click();
  await configurator.wheelOption(choices.wheel).click();
  await configurator.ensureOptional('opt-precision-park', choices.optionals.precisionPark);
  await configurator.ensureOptional('opt-flux-capacitor', choices.optionals.fluxCapacitor);
}
