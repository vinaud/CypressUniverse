describe('Test selects', () => {
  it('selecionar Bucky por id', () => {

    cy.visit('/select');

    cy.get('#avengerList').select('Bucky').should('have.value', '2');
  });

  it('selecionar Tony Stark sem usar id', () => {

    cy.visit('/select');

    cy.contains('option', 'Selecione um personagem').parent().select('Tony Stark').should('have.value', '3');
  })
})
