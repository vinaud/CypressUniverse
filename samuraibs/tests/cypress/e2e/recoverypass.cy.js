import forgotPassPage from '../support/pages/forgotpass';
import recoveryPassPage from '../support/pages/resetpass';

describe('resgate de senha', function(){

    before(function(){
        cy.fixture("recovery").then(function(recovery){
            this.data = recovery;
        });
    });

    context('quando o usuário esquece a senha', function(){

        before(function(){
            cy.postUser(this.data)
        });

        it('deve poder resgatar por email', function(){
            forgotPassPage.go();
            forgotPassPage.form(this.data.email);
            forgotPassPage.submit();

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.';
            forgotPassPage.toast.shouldHaveText(message);
        });

    });

    context('quando o usuário solicita o resgate', function(){

        before(function(){
            cy.postUser(this.data);
            cy.recoveryPass(this.data.email);
        });

        it('deve poder cadastrar uma nova senha', function(){

            const token = Cypress.env('recoveryToken');

            recoveryPassPage.go(token);
            recoveryPassPage.form('abc123', 'abc123');
            recoveryPassPage.submit();

            const expectedtext = 'Agora você já pode logar com a sua nova senha secreta.'
            recoveryPassPage.toast.shouldHaveText(expectedtext);
        });
    });
});