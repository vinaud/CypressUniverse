//var faker = require('faker');

describe('Teste de cadastro no sistema', () => {

  it('deve cadastrar um novo usuário', () => {

    const user = {
      name: 'João Vinaud',
      email: 'vinaud@samuraibs.com',
      password: 'pwd123'
    }

    cy.task('removeUser', user.email).then(function(result){
      console.log(result);
    })

    cy.visit('/signup');

   // cy.intercept('POST', '/users', {
   //   statuscode: 200
   // }).as('postUser');

    cy.get('input[placeholder="Nome"]').type(user.name);
    cy.get('input[placeholder="E-mail"]').type(user.email);
    cy.get('input[placeholder="Senha"]').type(user.password);

    cy.contains('button', 'Cadastrar').click();

   // cy.wait('@postUser')

    cy.get('.toast')
      .should('be.visible')
      .find('p')
      .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!');
  });

  it('deve exibir email ja cadastrado', () => {

    const user = {
      name: 'João Vinaud',
      email: 'vinaud@samuraibs.com',
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
      .should('have.text', 'Email já cadastrado para outro usuário.');
  });


})