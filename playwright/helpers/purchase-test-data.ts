import { faker } from '@faker-js/faker';
import type { ExteriorColorId, WheelTypeId } from '../pages/configurator.page';
import type { CheckoutPersonalData } from '../pages/order.page';

const COLORS: ExteriorColorId[] = ['glacier-blue', 'midnight-black', 'lunar-white'];
const WHEELS: WheelTypeId[] = ['aero', 'sport'];

export type RandomConfiguratorChoices = {
  color: ExteriorColorId;
  wheel: WheelTypeId;
  optionals: { precisionPark: boolean; fluxCapacitor: boolean };
};

/** Cor, rodas e opcionais independentes — cobertura estocástica a cada execução. */
export function buildRandomConfiguratorChoices(): RandomConfiguratorChoices {
  return {
    color: faker.helpers.arrayElement(COLORS),
    wheel: faker.helpers.arrayElement(WHEELS),
    optionals: {
      precisionPark: faker.helpers.arrayElement([true, false]),
      fluxCapacitor: faker.helpers.arrayElement([true, false]),
    },
  };
}

function formatBrazilPhone(digits11: string): string {
  const d = digits11.replace(/\D/g, '').padStart(11, '0').slice(0, 11);
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function formatBrazilCpf(digits11: string): string {
  const d = digits11.replace(/\D/g, '').padStart(11, '0').slice(0, 11);
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

/** Dados compatíveis com máscaras e validação Zod em {@link src/pages/Order.tsx}. */
export function buildCheckoutPerson(): CheckoutPersonalData {
  const first = faker.person.firstName();
  const last = faker.person.lastName();
  return {
    name: first,
    surname: last,
    email: faker.internet.email({ firstName: first, lastName: last }),
    phone: formatBrazilPhone(faker.string.numeric(11)),
    cpf: formatBrazilCpf(faker.string.numeric(11)),
  };
}
