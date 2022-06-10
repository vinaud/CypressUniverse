describe('teste de novas janeals', () => {
  it('nova guia', () => {
    cy.visit('/new_tab');

    cy.get('a[href="https://www.google.com.br"]').should('have.attr', 'target', '_blank');

     //invokes jquery removeAttr to remove the target atribute and open at hte same tab indtead of another
    cy.contains('a', 'Clique aqui').invoke('removeAttr', 'target');

    cy.contains('a', 'Clique aqui').click();

    cy.get('.gLFyf').type('Cypress {enter}', {force: true},);

  })
})
