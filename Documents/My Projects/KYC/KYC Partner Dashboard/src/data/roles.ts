import { Iroles } from '@/shared/interface/roles';
import { faker } from '@faker-js/faker';

export const ROLES: Iroles[] = [];

export function createRandomRoles(): Iroles {
  return {
    name: faker.helpers.arrayElement(['Administrator', 'User', 'New Role']),
    date: faker.date.recent(),
    users: faker.helpers.arrayElement(['4', '500', '20']),
  };
}

Array.from({ length: 5 }).forEach(() => {
  ROLES.push(createRandomRoles());
});

export const roleData = {
  data: { roles: ROLES },
};
