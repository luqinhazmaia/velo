import { faker } from '@faker-js/faker';
import { LOJAS_RETIRADA } from '../constants/test-data';
import { test, expect } from '../fixtures/pages.fixture';
import { buildCheckoutPerson, buildRandomConfiguratorChoices } from '../helpers/purchase-test-data';
import { aplicarConfiguracaoAleatoria, irParaConfiguratorAPartirDaHome } from '../steps';

test.describe('Compra do veículo com sucesso', () => {
  test('deve concluir compra à vista com configuração aleatória', async ({
    page,
    landingPage,
    configuratorPage,
    orderPage,
    successPage,
  }) => {
    await irParaConfiguratorAPartirDaHome(landingPage);

    const choices = buildRandomConfiguratorChoices();
    await aplicarConfiguracaoAleatoria(configuratorPage, choices);
    await configuratorPage.goToCheckout();
    await expect(page).toHaveURL(/\/order/);

    const person = buildCheckoutPerson();
    const loja = faker.helpers.arrayElement([...LOJAS_RETIRADA]);

    await orderPage.fillPersonalData(person);
    await orderPage.selectStore(loja);
    await orderPage.selectPaymentAvista();
    await orderPage.acceptTerms();
    await orderPage.submitOrder();

    await expect(page).toHaveURL(/\/success/, { timeout: 60_000 });
    await successPage.expectPedidoAprovado();
  });

  test('deve concluir compra financiada com configuração aleatória', async ({
    page,
    landingPage,
    configuratorPage,
    orderPage,
    successPage,
  }) => {
    await page.route('**/functions/v1/credit-analysis', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ score: 750 }),
      });
    });

    await irParaConfiguratorAPartirDaHome(landingPage);

    const choices = buildRandomConfiguratorChoices();
    await aplicarConfiguracaoAleatoria(configuratorPage, choices);
    await configuratorPage.goToCheckout();
    await expect(page).toHaveURL(/\/order/);

    const person = buildCheckoutPerson();
    const loja = faker.helpers.arrayElement([...LOJAS_RETIRADA]);

    await orderPage.fillPersonalData(person);
    await orderPage.selectStore(loja);
    await orderPage.selectPaymentFinanciamento();
    await orderPage.fillEntryValue(0);
    await orderPage.acceptTerms();
    await orderPage.submitOrder();

    await expect(page).toHaveURL(/\/success/, { timeout: 60_000 });
    await successPage.expectPedidoAprovado();
  });
});

test.describe('Compra do veículo - validar campos obrigatórios', () => {
  test('Usuário não preencheu nenhum campo obrigatório: ', async ({
    page,
    landingPage,
    configuratorPage,
    orderPage,
  }) => {
    await irParaConfiguratorAPartirDaHome(landingPage);

    const choices = buildRandomConfiguratorChoices();
    await aplicarConfiguracaoAleatoria(configuratorPage, choices);
    await configuratorPage.goToCheckout();
    await expect(page).toHaveURL(/\/order/);

    await orderPage.submitOrder();

    await expect(page.locator('form')).toContainText('Nome deve ter pelo menos 2 caracteres');
    await expect(page.locator('form')).toContainText('Sobrenome deve ter pelo menos 2 caracteres');
    await expect(page.locator('form')).toContainText('Email inválido');
    await expect(page.locator('form')).toContainText('Telefone é obrigatório');
    await expect(page.locator('form')).toContainText('CPF é obrigatório');
    await expect(page.locator('form')).toContainText('Selecione uma loja');
    await expect(page.locator('form')).toContainText('Aceite os termos');
  });

  test('Usuário preencheu os campos obrigatórios, mas com valores inválidos: ', async ({
    page,
    landingPage,
    configuratorPage,
    orderPage,
  }) => {
    await irParaConfiguratorAPartirDaHome(landingPage);

    const choices = buildRandomConfiguratorChoices();
    await aplicarConfiguracaoAleatoria(configuratorPage, choices);
    await configuratorPage.goToCheckout();
    await expect(page).toHaveURL(/\/order/);

    await orderPage.fillIncorrectPersonalData();
    await orderPage.selectPaymentAvista();
    await orderPage.submitOrder();
    
    await expect(page.locator('form')).toContainText('Nome não pode conter números ou caracteres especiais');
    await expect(page.locator('form')).toContainText('Sobrenome não pode conter números ou caracteres especiais');
    await expect(page.locator('form')).toContainText('Email inválido');
    await expect(page.locator('form')).toContainText('Telefone inválido');
    await expect(page.locator('form')).toContainText('CPF inválido');
    await expect(page.locator('form')).toContainText('Selecione uma loja');
    await expect(page.locator('form')).toContainText('Aceite os termos');
  });
});