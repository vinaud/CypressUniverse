describe('testes de iframes', () => {

  const niceIFrame = function(){
    return cy
    .get('#weareqaninja')
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap);
  }

  const badIFrame = function(){
    return cy
    .get('iframe[src*=instagram]')
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap);
  }

  it('deve validar o total de seguidores', () => {
    cy.visit('/nice_iframe');

    niceIFrame().contains('.FollowerCountText','6,761 followers').should('be.visible');
    niceIFrame().find('.UsernameText').should('have.text', 'qacademy_oficial');


  });

  it('deve validar o total de seguidores no iframe sem id', () => {
    cy.visit('/bad_iframe');

    badIFrame().contains('.FollowerCountText','6,761 followers').should('be.visible');


  })
})
