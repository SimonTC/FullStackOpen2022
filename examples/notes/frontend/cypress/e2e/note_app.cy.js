describe('Note app', function () {

  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('user can login', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged-in')
  })

  it('login fails with wrong password', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    // See common assertions to use with should here: https://docs.cypress.io/guides/references/assertions.html#Common-Assertions
    cy.get('.error')
      .should('contain','Wrong credentials')
      .and('have.css','color', 'rgb(255, 0, 0)')
      .and('have.css','border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('when logged in', function () {
    beforeEach(function() {
      cy.login({ username:'mluukkai', password: 'salainen' })
    })

    it('a new note can be created', function(){
      cy.contains('New note').click()
      cy.get('input').type('a note created by cypress')
      cy.get('#save-button').click()
      cy.contains('a note created by cypress')
    })

    describe('and multiple notes exists', function () {
      beforeEach(function(){
        cy.createNote({ content: 'first note',important: false })
        cy.createNote({ content: 'second note',important: false })
        cy.createNote({ content: 'third note',important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})