describe('teste de upload', () => {
  it('deve carregar a imagem', () => {
    cy.visit('/upload');

    const imageFile = 'cypress/fixtures/kyogre.jpg';
    cy.get('input[name=file]').selectFile(imageFile, {force: true});
    cy.get('input[value=Upload]').click();

    cy.get('img[src="/uploads/kyogre.jpg"]', {timeout: 7000}).should('be.visible');
  })
})
