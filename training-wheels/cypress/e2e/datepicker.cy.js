describe('teste datepicker', () => {
  it('selecionar a data de nascimento', () => {
    cy.visit('/datepicker')

    const date = {
      month: 'nov',
      year: '1983',
      day: '30'
    }

    cy.get(' .datetimepicker-dummy-input').click();

    cy.get(' .datepicker-nav-month').click();
    cy.contains('.datepicker-month', date.month).click();

    cy.get(' .datepicker-nav-year').click();
    cy.contains('.datepicker-year span', date.year).click();

    cy.contains('.is-current-month button.date-item',  new RegExp("^" + date.day + "$", "g")).click();
    //^ = begins with,  $ = ends with modifier, g -> exact comparison /^day$/g
    

  })
})
