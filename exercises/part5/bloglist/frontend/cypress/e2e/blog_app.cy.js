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

      cy.get('.error')
        .should('contain','Wrong credentials')
        .and('have.css','color', 'rgb(255, 0, 0)')
        .and('have.css','border-style', 'solid')

      cy.should('not.contain', 'Jimmy Tester logged in')
    })
  });

  describe('A logged in user', function () {
    beforeEach(function() {
      cy.login({ username:'testuser', password: 'salainen' })
    })

    it.only('can create a blog', function () {
      cy.contains('New blog').click()
      cy.contains('Title').type('My test blog')
      cy.contains('Author').type('Bobby B Man')
      cy.contains('Url').type('www.bestblog.com')
      cy.contains('button', 'Create').click()

      cy.contains('A new blog post titled "My test blog" by Bobby B Man')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.getBy('blog').contains('My test blog').contains('Bobby B Man')
    })
  });

});