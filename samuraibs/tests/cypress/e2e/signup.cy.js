import signupPage from '../support/pages/signup';

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

      signupPage.go();
      signupPage.form(user);
      signupPage.submit();

      const expectedtext = 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!';
      signupPage.toastHaveText(expectedtext);
     
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

     signupPage.go();
     signupPage.form(user);
     signupPage.submit();

     const expectedtext = 'Email já cadastrado para outro usuário.';
     signupPage.toastHaveText(expectedtext);
    });
  });

})