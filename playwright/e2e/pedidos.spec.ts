import { test, expect } from '@playwright/test';

test('Deve consultar um pedido aprovado', async ({ page }) => {
    // Checkpoint 1: Verificar se a home foi carregada    
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

    // Checkpoint 2: Verificar se o formulário de consulta está presente
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByTestId('search-order-id')).toBeVisible();

    // Checkpoint 3: Preencher o formulário de consulta com um pedido aprovado
    await page.getByTestId('search-order-id').fill('VLO-G63Z80');
    await page.getByTestId('search-order-button').click();

    // Checkpoint 4: Verificar se o pedido foi encontrado e está aprovado
    await expect(page.getByTestId('order-result-id')).toContainText('VLO-G63Z80');
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});

test('Deve consultar um pedido inexistente', async ({ page }) => {
    // Checkpoint 1: Verificar se a home foi carregada    
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

    // Checkpoint 2: Verificar se o formulário de consulta está presente
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByTestId('search-order-id')).toBeVisible();

    // Checkpoint 3: Preencher o formulário de consulta com um pedido inexistente
    await page.getByTestId('search-order-id').fill('VLO-000000');
    await page.getByTestId('search-order-button').click();

    // Checkpoint 4: Verificar se o pedido não foi encontrado
    await expect(page.locator('#root')).toContainText('Pedido não encontrado');
});