describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3001/')
    cy.get('#inputEmail').type("bora@bill.com.br");
    cy.get('#inputPassword').type("borabill");
    cy.get('.btn-outline-light').click()
  })
})