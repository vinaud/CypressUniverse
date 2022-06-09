describe('teste de toast', () => {
  it('deve exibir uma notificação toast', () => {
    cy.visit('/toaster');

    //use cy.get('body') to inspect the toast element within the test execution snapshots
    cy.contains('button', 'Toast Rápido').click();

    cy.get('.notification').should('be.visible').should('have.text', 'Essa notificação é muito rápida!');
  })
})
