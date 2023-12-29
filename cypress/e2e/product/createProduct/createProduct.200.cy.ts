import { faker } from '@faker-js/faker';
import * as fs from 'fs';

describe('create Product', () => {
  it('create is done', () => {
    // const name = faker.company.name();
    const email = faker.internet.email();
    // const price = faker.number.int();
    const password = faker.internet.password();
    const username = faker.internet.userName();
    const baseUrl = Cypress.config('baseUrl');
    // const file = new File([''], 'fkfkkf');
    // const file = '/home/al_yaman/projectt/ecom/src/img';

    const bodyRegister = { email, password, username };
    // const formDAta = new FormData();
    // FormData.append('email', email);
    // FormData.append('email', email);
    // formDAta.append('password', password);
    // const body = { name, price };

    cy.request('POST', `${baseUrl}/auth/sign`, bodyRegister).then((res) => {
      console.log('res', { res });
    });
  });
});
