describe('test other selects', () => {
  it('deve selecioanr uma única opção', () => {
    cy.visit('/apps/select2/index.html');
    cy.get('.select2-selection--single').click();
    cy.contains('.select2-results__option', 'Cypress').click();
  });

  it('deve selecioanr multiplas opções', () => {
    cy.visit('/apps/select2/index.html');

    const frameworks = ['Cypress', 'Playwright', 'Protractor', 'Robot Framework'];

    frameworks.forEach((framework) =>{

      cy.get('.select2-selection--multiple').click();
      cy.contains('.select2-results__option', framework).click();

    });

  
  })
})
