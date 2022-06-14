class SignupPage{

    go(){
        cy.visit('/signup');
    }

    form(user){
        cy.get('input[placeholder^="Nome"]').type(user.name);
        cy.get('input[placeholder$="email"]').type(user.email);
        cy.get('input[placeholder*="senha"]').type(user.password);
    }

    submit(){
        cy.contains('button', 'Cadastrar').click();
    }

    toastHaveText(expectedtext){
        cy.get('.toast', { timeout: 7000 })
        .should('be.visible')
        .find('p')
        .should('have.text', expectedtext);
    }
}

export default new SignupPage();