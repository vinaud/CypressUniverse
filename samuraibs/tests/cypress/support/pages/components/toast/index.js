import { el } from './elements'

class Toast {
    shouldHaveText(expectedtext){
        cy.get(el.toast)
        .should('be.visible')
        .should('have.css', 'opacity', '1')
        .find('p')
        .should('have.text', expectedtext);
    }
};

export default new Toast();