describe('testes de iframes', () => {

  const niceIFrame = function(){
    return cy
    .get('#weareqaninja')
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap);
  }

  it('deve validar o total de seguidores', () => {
    cy.visit('/nice_iframe');

    niceIFrame().contains('.FollowerCountText','6,761 followers').should('be.visible');


  })
})
