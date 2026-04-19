import type { LandingPage } from '../pages/landing.page';
import type { OrderLookupPage } from '../pages/order-lookup.page';

/**
 * Fluxo UI: landing (`/`) → link "Consultar Pedido" → `/lookup` com formulário visível.
 */
export async function irParaConsultaPedidoAPartirDaHome(
  landing: LandingPage,
  orderLookup: OrderLookupPage,
): Promise<void> {
  await landing.open();
  await landing.expectLoaded();
  await landing.openConsultarPedido();
  await orderLookup.expectSearchFormVisible();
}

/** Dispara a busca; o resultado depende da API Supabase (`getOrderByNumber`). */
export async function consultarPedidoPorNumero(
  orderLookup: OrderLookupPage,
  numeroPedido: string,
): Promise<void> {
  await orderLookup.searchOrder(numeroPedido);
}
