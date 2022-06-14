import { el } from './elements'

class Toast {
    shouldHaveText(expectedtext){
        cy.get(el.toast, { timeout: 7000 })
        .should('be.visible')
        .find('p')
        .should('have.text', expectedtext);
    }
};

export default new Toast();