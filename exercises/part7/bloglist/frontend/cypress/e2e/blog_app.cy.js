describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user1 = {
      name: 'Jimmy Tester',
      username: 'testuser',
      password: 'salainen',
    };
    const user2 = {
      name: 'Jane Doe',
      username: 'testuser2',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user1);
    cy.request('POST', 'http://localhost:3003/api/users/', user2);
    cy.visit('/');
  });

  it('Login form is shown', function () {
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.getBy('login-username').type('testuser');
      cy.getBy('login-password').type('salainen');
      cy.getBy('login-submit').click();
      cy.contains('Jimmy Tester logged in');
    });

    it('fails with wrong credentials', function () {
      cy.getBy('login-username').type('testuser');
      cy.getBy('login-password').type('wrong');
      cy.getBy('login-submit').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.should('not.contain', 'Jimmy Tester logged in');
    });
  });

  describe('A logged in user', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'salainen' });
    });

    it('can create a blog', function () {
      cy.contains('New blog').click();
      cy.contains('Title').type('My test blog');
      cy.contains('Author').type('Bobby B Man');
      cy.contains('Url').type('www.bestblog.com');
      cy.contains('button', 'Create').click();

      cy.contains('A new blog post titled "My test blog" by Bobby B Man')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.getBy('blog').contains('My test blog').contains('Bobby B Man');
    });

    describe('that has added a blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'My awesome blog',
          author: 'Someone',
          url: 'www.test.com',
        });
      });

      it('can like the blog', function () {
        cy.getBy('blog').contains('button', 'view').click();
        cy.contains('Likes').contains('0');
        cy.contains('button', 'Like').click();
        cy.contains('Likes').contains('1');
      });

      it('can delete the blog', function () {
        cy.getBy('blog').contains('button', 'view').click();
        cy.get('button').contains('Remove').click();
        cy.getBy('blog').contains('My awesome blog').should('not.exist');
      });
    });
  });

  it('A blog added by one user cannot be deleted by another user', function () {
    cy.login({ username: 'testuser', password: 'salainen' });
    cy.createBlog({
      title: 'Blog added by testuser1',
      author: 'Someone',
      url: 'www.test.com',
    });
    cy.login({ username: 'testuser2', password: 'salainen' });
    cy.getBy('blog').contains('button', 'view').click();
    cy.get('button').contains('Remove').should('not.exist');
  });

  it('Blogs are ordered by likes', function () {
    cy.login({ username: 'testuser', password: 'salainen' });
    cy.createBlog({
      title: 'Blog 1',
      author: 'Someone',
      url: 'www.test.com',
      likes: 5,
    });
    cy.createBlog({
      title: 'Blog 2',
      author: 'Someone',
      url: 'www.test.com',
      likes: 7,
    });
    cy.createBlog({
      title: 'Blog 3',
      author: 'Someone',
      url: 'www.test.com',
      likes: 3,
    });
    cy.getBy('blog').eq(0).contains('Blog 2');
    cy.getBy('blog').eq(1).contains('Blog 1');
    cy.getBy('blog').eq(2).as('Blog3').contains('Blog 3');

    cy.get('@Blog3').contains('button', 'view').click();
    cy.get('@Blog3').contains('button', 'Like').click();
    cy.get('@Blog3').contains('Likes: 4');
    cy.get('@Blog3').contains('button', 'Like').click();
    cy.get('@Blog3').contains('Likes: 5');
    cy.get('@Blog3').contains('button', 'Like').click();
    cy.get('@Blog3').contains('Likes: 6');

    cy.getBy('blog').eq(1).contains('Blog 3');
  });
});
