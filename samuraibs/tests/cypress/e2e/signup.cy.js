import signupPage from '../support/pages/signup';

describe('Teste de cadastro no sistema', () => {
  before(function () {
    cy.fixture('user').then(function(joao){
      this.joao = joao
    });
  });

  context('quando o usuário é novato', function () {

    before(function () {
      cy.task('removeUser', this.joao.email).then(function (result) {
        console.log(result);
      });
    });

    it('deve cadastrar com sucesso', function () {

      signupPage.go();
      signupPage.form(this.joao);
      signupPage.submit();

      const expectedtext = 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!';
      signupPage.toast.shouldHaveText(expectedtext);

    });
  });

  context('quando o email já existe', function () {

    const user = {
      name: 'Fernando papito',
      email: 'papito@samuraibs.com',
      password: 'pwd123',
      is_provider: true
    }

    before(function () {

      cy.postUser(user);

    });

    it('não deve cadastrar o usuário', () => {

      signupPage.go();
      signupPage.form(user);
      signupPage.submit();

      const expectedtext = 'Email já cadastrado para outro usuário.';
      signupPage.toast.shouldHaveText(expectedtext);
    });
  });

  context('quando o email é incorreto', function () {

    const user = {
      name: 'Elisabeth Olsen',
      email: 'lisa.yahoo.com',
      password: 'pwd123'
    }

    it('deve exibir mensagem de alerta', function () {

      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.alert.haveText('Informe um email válido');
    });

  });

  context('quando a senha tem menos de 6 caracteres', function () {

    const passwords = ['1', '2a', 'ab3', 'abc4', 'ab##5'];

    beforeEach(function () {
      signupPage.go();
    });

    passwords.forEach(function (p) {
      it('não deve cadastrar com a senha: ' + p, function () {

        const user = {
          name: 'Jason Friday',
          email: 'jason@gmail.com',
          password: p
        }

        signupPage.form(user);
        signupPage.submit();
      });
    });

    afterEach(function () {
      signupPage.alert.haveText('Pelo menos 6 caracteres');
    });


  });

  context('quando não preencho nenhum dos campos', function () {

    const alertMessages = ['Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória'];

    before(function () {

      signupPage.go();
      signupPage.submit();

    });

    alertMessages.forEach(function (alert) {
      it('deve exibir ' + alert.toLowerCase(), function () {
        signupPage.alert.haveText(alert);
      });
    });

  });

})