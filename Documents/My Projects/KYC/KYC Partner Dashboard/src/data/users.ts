import { BusinessUser } from '@/shared/interface/user';
import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';

export const USERS: Partial<BusinessUser>[] = [];

export function createRandomUsers(): Partial<BusinessUser> {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['Admin', 'User', 'Agent']),
    lastLogin: faker.helpers.arrayElement([
      'Aug 13 2020 2:21 PM',
      'Aug 13 2020 1:20 PM',
      'Aug 9 2020 5:21 PM',
    ]),
  };
}

Array.from({ length: 10 }).forEach(() => {
  USERS.push(createRandomUsers());
});

export const userData = {
  data: { UsersData: USERS },
};
