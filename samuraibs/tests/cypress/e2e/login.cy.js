import loginPage from '../support/pages/login';
import dashPage from '../support/pages/dashboard';

describe('página de login', function () {
    context('quando o usuário é muito bom', function () {

        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {

            cy.postUser(user);

        });

        it('deve logar com sucesso', function () {
            cy.uiLogin(user);
        });
    });

    context('quando o usuário é bom, mas a senha está incorreta', function () {

        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () {
                user.password = 'abc123';
            });

        });

        it('deve notificar erro de credenciais', function () {
            loginPage.go();
            loginPage.form(user);
            loginPage.submit();

            const expectedText = 'Ocorreu um erro ao fazer login, verifique suas credenciais.';
            loginPage.toast.shouldHaveText(expectedText);
        });
    });

    context('quando o formato do email é inválido', function () {

        const emails = [
            'papito.com.br',
            'yahoo.com',
            '@gmail.com',
            '@',
            'papito@',
            '111',
            '&*&*#&*#',
            'xpto123'
        ]

        before(function(){
            loginPage.go();
        });

        emails.forEach(function (email) {
            it('não deve logar com o email: ' + email, function () {

                const user = { email: email, password: 'pwd123' };

                loginPage.form(user);
                loginPage.submit();
                loginPage.alert.haveText('Informe um email válido');
            })
        })
    });

    context('quando não preencho nenhum dos campos', function () {

        const alertMessages = [ 'E-mail é obrigatório', 'Senha é obrigatória'];
    
        before(function () {
    
          loginPage.go();
          loginPage.submit();
    
        });
    
        alertMessages.forEach(function (alert) {
          it('deve exibir ' + alert.toLowerCase(), function () {
            loginPage.alert.haveText(alert);
          });
        });
    
      });
});