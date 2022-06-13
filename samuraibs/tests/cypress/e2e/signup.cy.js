var faker = require('faker');

describe('Teste de cadastro no sistema', () => {

  it('deve cadastrar um novo usuário', () => {

    const user = {
      name: 'João Vinaud',
      email: faker.internet.email(),
      password: 'pwd123'
    }

    cy.visit('/signup');

    cy.get('input[placeholder="Nome"]').type(user.name);
    cy.get('input[placeholder="E-mail"]').type(user.email);
    cy.get('input[placeholder="Senha"]').type(user.password);

    cy.contains('button', 'Cadastrar').click();
    cy.get('.toast')
      .should('be.visible')
      .find('p')
      .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!');
  })
})