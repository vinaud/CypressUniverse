import forgotPassPage from '../support/pages/forgotpass'

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
});