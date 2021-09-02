/* eslint-disable no-undef */
describe('Bloglist app', function () {
  // Testien yhteinen osa
  beforeEach(function() {
    //   cy.request('POST', 'http://localhost:3003/api/testing/reset') ei toimi
      cy.visit('http://localhost:3000')
    })
  // Kirjautumislomakkeen näyttö
  it('Login form is shown', function () {
    cy.contains('Log in to application').click()
  })

  describe('Login',function() {
    // Kirjautumisen toimiminen.
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('Kapteeni H')
      cy.get('input:last').type('turskatti')
      cy.get('button:first').click()
      cy.contains('Kapteeni H logged in')
    })
    // Epäonnistunut kirjautuminen
    it('fails with wrong credentials', function() {
      cy.get('input:first').type('Kapteeni M')
      cy.get('input:last').type('himskatti')
      cy.get('button:first').click()
    })
    // Kirjautuneen käyttäjän testit.
    describe('When logged in', function() {
      // Kirjautuminen aina ennen testiä
      beforeEach(function() {
        cy.get('input:first').type('Kapteeni H')
        cy.get('input:last').type('turskatti')
        cy.get('button:first').click()
        })
        // Uuden blogin luonti
        it('A new blog can be created', function() {
        //   cy.contains('new blog').click()
        //   cy.get('#title').type('cypress blog')
        //   cy.get('#author').type('Cypress')
        //   cy.get('#url').type('cypressblog.com')
        //   cy.contains('save').click()
          cy.contains('cypress blog')
         })
        // Blogista tykkääminen
        it('A blog can be liked', function() {
          cy.get('#toggle').click()
          cy.get('#like-button').click()
        })
        // Blogin luonti ja poisto
        it('A blog can be created and deleted', function() {
          //   cy.contains('new blog').click()
        //   cy.get('#title').type('cypress delete blog')
        //   cy.get('#author').type('Cypress delete')
        //   cy.get('#url').type('cypressdeleteblog.com')
        //   cy.contains('save').click()
          
          cy.contains('cypress delete blog').contains('View').click()

          cy.contains('cypress delete blog').contains('remove').click()
          })
        
      })
  })
  // Blogisivun näyttö
//   it('front page can be opened', function () {
//     cy.contains('Blogs')
//     cy.contains('logged in')
//   })
})