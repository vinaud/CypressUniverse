//var faker = require('faker');

describe('Teste de cadastro no sistema', () => {

  context('quando o usuário é novato', function(){

    const user = {
      name: 'João Vinaud',
      email: 'vinaud@samuraibs.com',
      password: 'pwd123'
    }

    before(function(){
      cy.task('removeUser', user.email).then(function(result){
        console.log(result);
      });
    });

    it('deve cadastrar com sucesso', () => {

      cy.visit('/signup');
  
     // cy.intercept('POST', '/users', {
     //   statuscode: 200
     // }).as('postUser');
  
      cy.get('input[placeholder="Nome"]').type(user.name);
      cy.get('input[placeholder="E-mail"]').type(user.email);
      cy.get('input[placeholder="Senha"]').type(user.password);
  
      cy.contains('button', 'Cadastrar').click();
  
     // cy.wait('@postUser')
  
      cy.get('.toast', { timeout: 7000 })
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
    });
  });

  context('quando o email já existe', function(){

    const user = {
      name: 'Fernando papito',
      email: 'papito@samuraibs.com',
      password: 'pwd123',
      is_provider: true
    }

    before(function(){

      cy.task('removeUser', user.email).then(function(result){
        console.log(result);
      });
  
      cy.request(
        'POST',
        'http://localhost:3333/users',
        user
      ).then(function(response){
        expect(response.status).to.be.equal(200);
      });
    });

    it('não deve cadastrar o usuário', () => {

      cy.visit('/signup');
  
      cy.get('input[placeholder="Nome"]').type(user.name);
      cy.get('input[placeholder="E-mail"]').type(user.email);
      cy.get('input[placeholder="Senha"]').type(user.password);
  
      cy.contains('button', 'Cadastrar').click();
  
      cy.get('.toast', { timeout: 7000 })
        .should('be.visible')
        .find('p')
        .should('have.text', 'Email já cadastrado para outro usuário.');
    });
  });

})