/**
 * Dados de teste alinhados ao backend: tabela Supabase `orders`,
 * consulta por `order_number` (normalização uppercase no cliente — {@link src/hooks/useOrders.ts}).
 */
export const PEDIDOS_TESTE = {
  existenteAprovado: 'VLO-G63Z80',
  inexistente: 'VLO-000000',
} as const;

/** Lojas — {@link src/pages/Order.tsx} `stores` */
export const LOJAS_RETIRADA = [
  'Velô Paulista - Av. Paulista, 1000',
  'Velô Faria Lima - Av. Faria Lima, 2500',
  'Velô Morumbi - Av. Morumbi, 1500',
  'Velô Ibirapuera - Av. Ibirapuera, 3000',
] as const;
