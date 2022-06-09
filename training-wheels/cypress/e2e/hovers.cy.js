describe('teste de mouse hover', () => {
  it('deve exibir o nome da tecnologia ao passar o mouse', () => {
    cy.visit('/hovers');

    const techs = [
      {locator: 'img[src*=python]', tag: '.tag-python', text:"Python"},
      {locator: 'img[src*=golang]', tag: '.tag-golang', text:"Golang"},
      {locator: 'img[src*=nodejs]', tag: '.tag-nodejs', text:"Node.js"},
      {locator: 'img[src*=netcore]', tag: '.tag-netcore', text:".NETCore"}
    ];

    techs.forEach((tech) =>{
      //uses realHover() command from 'cypress-real-events/support' lib
      cy.get(tech.locator).realHover('mouse')
      cy.get(tech.tag).should('be.visible').should('have.text', tech.text);
      //wait used to see the hover at testing
      cy.wait(500);
    });

  })
})
