import { ITransaction } from '@/shared/interface/transaction';
import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';

export const TRANSACTIONS: ITransaction[] = [];

export function createRandomTransactions(): ITransaction {
  return {
    name: faker.name.fullName(),
    initiatedBy: faker.name.fullName(),
    price: faker.commerce.price(100, 100000, 0, '₦'),
    date: faker.date.recent(),
    type: faker.helpers.arrayElement([
      'Medical, Certificate, Address, Identity',
      'Medical, Certificate, Address',
      'Medical, Address, Identity',
      'ID, Address, Identity',
      'ID, Property, Address',
      'Address, Identity, Property',
    ]),
    status: faker.helpers.arrayElement([
      'Pending',
      'Initiated',
      'Verified',
      'Failed',
    ]),
  };
}

Array.from({ length: 10 }).forEach(() => {
  TRANSACTIONS.push(createRandomTransactions());
});

export const transactionData = {
  data: { Transactions: TRANSACTIONS },
};
