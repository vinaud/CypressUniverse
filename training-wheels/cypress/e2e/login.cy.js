describe('Login do usuário', () => {
  it('deve conseguir logar com sucesso', () => {
    cy.visit('/login');
    cy.get('#nickId').type('papitorocks');
    cy.get('#passId').type('pwd123');
    cy.get('form .button[type=submit]').click();
  })
})
