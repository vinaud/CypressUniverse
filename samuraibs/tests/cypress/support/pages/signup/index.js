import { el } from './elements'

class SignupPage{

    go(){
        cy.visit('/signup');
    }

    form(user){
        cy.get(el.name).type(user.name);
        cy.get(el.email).type(user.email);
        cy.get(el.password).type(user.password);
    }

    submit(){
        cy.contains(el.signupButton).click();
    }

    toastHaveText(expectedtext){
        cy.get(el.toast, { timeout: 7000 })
        .should('be.visible')
        .find('p')
        .should('have.text', expectedtext);
    }
}

export default new SignupPage();