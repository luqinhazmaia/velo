import type { LandingPage } from '../pages/landing.page';
import type { OrderLookupPage } from '../pages/order-lookup.page';
import type { ConfiguratorPage } from '../pages/configurator.page';

/** Garante que a landing (`/`) está carregada (hero Velô Sprint). */
export async function garantirHomeCarregada(landing: LandingPage): Promise<void> {
  await landing.open();
  await landing.expectLoaded();
}

/** Navega para `/lookup` pela URL (útil quando o fluxo não precisa partir da home). */
export async function abrirConsultaPedidoPorUrl(orderLookup: OrderLookupPage): Promise<void> {
  await orderLookup.open();
  await orderLookup.expectSearchFormVisible();
}

/** Abre o configurador (`/configure`) — etapa anterior ao checkout em `/order`. */
export async function abrirConfigurator(configurator: ConfiguratorPage): Promise<void> {
  await configurator.open();
}
