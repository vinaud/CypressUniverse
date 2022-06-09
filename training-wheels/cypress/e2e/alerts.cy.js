describe('teste de alertas', () => {
  it('deve exibir uma mensagem de alerta', () => {
    cy.visit('/javascript_alerts');
    cy.contains('button', 'Alerta').click();

    cy.on('window:alert', function(result){
      expect(result).to.be.equal('Isto é uma mensagem de alerta')
    });
  })
})
