import { faker } from '@faker-js/faker';

describe('test', () => {
  it('test user', () => {
    const email = faker.internet.email();
    const password = 'ema12';
    const username = 'as';
    const body = { email, password, username };
    const baseUrl = Cypress.config('baseUrl');

    cy.request('POST', `${baseUrl}/auth/sign`, body).then((res) => {
      console.log('res', { res });
    });
  });
});
