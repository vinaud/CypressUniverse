describe('testes tabela', () => {
  it('deve exibir 7 séries no total', () => {
    cy.visit('/tables')

    cy.get('table tbody tr').then(function(series){
      expect(series).to.have.length(7)
    });
  });
  
  it('deve exibir a série Loki', () => {
    cy.visit('/tables')

    cy.contains('table tbody tr', 'Loki').then(function(item){
      expect(item).to.contain('Marvel');
      expect(item).to.contain('Disney+');
      expect(item).to.contain('2021');
    })
  });

  it('deve remover a série Round 6', () => {
    cy.visit('/tables')

    cy.contains('table tbody tr', 'Round 6').then(function(item){
      cy.wrap(item).find('.delete').click();
      //item.find('.delete').trigger()
    }).should('not.exist');

    cy.get('table tbody tr').then(function(series){
      expect(series).to.have.length(6);
    });
  });
})
