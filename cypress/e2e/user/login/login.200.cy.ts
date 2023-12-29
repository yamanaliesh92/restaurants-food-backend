import { faker } from '@faker-js/faker';

describe('test login', () => {
  it('test with 200', () => {
    const baseUrl = Cypress.config('baseUrl');
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = 'ali';
    const body = { email, password };
    const booyRegister = { email, password, username };

    cy.request('POST', `${baseUrl}/auth/sign`, booyRegister).then((res) => {
      cy.request('POST', `${baseUrl}/auth/login`, body).then((resLogin) => {
        console.log('res', { resLogin });
        expect(resLogin.body.token).to.exist;
        expect(resLogin.body.token).to.string;
        expect(resLogin.status).to.eq(201);
      });
    });
  });
});
