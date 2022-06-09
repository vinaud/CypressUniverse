describe('teste de alertas', () => {
  it('deve exibir uma mensagem de alerta', () => {
    cy.visit('/javascript_alerts');
    cy.contains('button', 'Alerta').click();

    cy.on('window:alert', function(result){
      expect(result).to.be.equal('Isto é uma mensagem de alerta')
    });

    
  });

  it('deve confirmar a solicitaçãoa', () => {
    cy.visit('/javascript_alerts');
    cy.contains('button', 'Confirma').click();

    cy.on('window:confirm',  () => true);

    cy.get('#result').should('have.text', 'Mensagem confirmada');

    
  });

  it('deve cancelar a solicitaçãoa', () => {
    cy.visit('/javascript_alerts');
    cy.contains('button', 'Confirma').click();

    cy.on('window:confirm',  () => false);

    cy.get('#result').should('have.text', 'Mensagem não confirmada');

    
  });

})
