import { IVerification } from '@/shared/interface/verification';
import { faker } from '@faker-js/faker';

export const VERIFICATIONS: IVerification[] = [];

export function createRandomVerifications(): IVerification {
  return {
    candidate: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
    agent: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
    createdAt: faker.date.recent(),
    type: faker.helpers.arrayElement(['Business', 'Individual']),
    status: faker.helpers.arrayElement(['Pending', 'In Progress', 'Completed']),
    _id: faker.database.mongodbObjectId(),
  };
}

Array.from({ length: 20 }).forEach(() => {
  VERIFICATIONS.push(createRandomVerifications());
});

export function createMeta(
  total: number,
  perPage: number = 10,
  currentPage: number = 1
) {
  const lastPage = Math.ceil(total / perPage);
  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(total, currentPage * perPage);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < lastPage ? currentPage + 1 : null;

  return {
    lastPage,
    total,
    from,
    to,
    perPage,
    currentPage,
    prevPage,
    nextPage,
  };
}

const meta = createMeta(VERIFICATIONS.length, 10, 1);

export const verificationData = {
  data: {
    data: VERIFICATIONS,
    meta,
  },
};
