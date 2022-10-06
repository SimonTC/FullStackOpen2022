describe('Blog app', function () {
  beforeEach(function (){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jimmy Tester',
      username: 'testuser',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('/')
  })

  it('Login form is shown', function () {
      cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.getBy('login-username').type("testuser")
      cy.getBy('login-password').type("salainen")
      cy.getBy('login-submit').click()
      cy.contains('Jimmy Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.getBy('login-username').type("testuser")
      cy.getBy('login-password').type("wrong")
      cy.getBy('login-submit').click()
      cy.contains('Wrong credentials')
      cy.should('not.contain', 'Jimmy Tester logged in')
    })
  });

});