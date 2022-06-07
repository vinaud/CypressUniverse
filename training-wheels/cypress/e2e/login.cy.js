describe('Login do usuário', () => {
  it('deve conseguir logar com sucesso', () => {
    cy.visit('/login');
    cy.get('#nickId').type('papitorocks');
    cy.get('#passId').type('pwd123');
    cy.get('form .button[type=submit]').click();
    cy.get('h3[class^="title').should('have.text', 'Olá Papito, bem-vindo ao Orkut');

    const expectedText = 'Em breve você poderá participar de comunidades, adicionar amigos e deixar um Scraps. hahahahah';
    cy.get('p.subheader').should('have.text', expectedText);

  })
})
