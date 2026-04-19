import { consultarPedidoPorNumero, irParaConsultaPedidoAPartirDaHome } from '../steps';
import { PEDIDOS_TESTE } from '../constants/test-data';
import { test } from '../fixtures/pages.fixture';

test('Deve consultar um pedido existente', async ({ landingPage, orderLookupPage }) => {
  await irParaConsultaPedidoAPartirDaHome(landingPage, orderLookupPage);
  await consultarPedidoPorNumero(orderLookupPage, PEDIDOS_TESTE.existenteAprovado);
  await orderLookupPage.expectOrderFound(PEDIDOS_TESTE.existenteAprovado, 'APROVADO');
});

test('Deve consultar um pedido inexistente', async ({ landingPage, orderLookupPage }) => {
  await irParaConsultaPedidoAPartirDaHome(landingPage, orderLookupPage);
  await consultarPedidoPorNumero(orderLookupPage, PEDIDOS_TESTE.inexistente);
  await orderLookupPage.expectOrderNotFound();
});
