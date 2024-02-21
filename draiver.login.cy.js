const { Runnable } = require("mocha");
import { PAGE_SELECTORS } from '/Users/mariannaaloisio/Desktop/Cypress/cypress/e2e/cypress/pom/selectors.cy.js';
let user = 'automation.test@gmail.com';
let password = '12345';
const loginPage = PAGE_SELECTORS.LOGING_PAGE;

describe('Draiver Login page', { tags: ['@smoke'] }, () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, Runnable) => {
            console.log(err, Runnable)
            return false
        })
        cy.visit(loginPage.URL)

    })

    it('URL verification for login page', () => {
        cy.url().should('contain', loginPage.URL)
        //Given: user navigates to the Draiver web site
        //When: user navigates to the login page
        //Then: user can see the URL is XXX
    })

    it('Login page', () => {
        cy.get(loginPage.LOGO).should('be.visible')
        cy.get(loginPage.PAGE_TITLE).should('be.visible')
        cy.get(loginPage.USERNAME_FIELD).should('be.visible')
        cy.get(loginPage.PASSWORD_FIELD).should('be.visible')
        cy.get(loginPage.LOGIN_BUTTON).should('be.visible')
        cy.get(loginPage.CREATE_ACCOUNT_LINK).should('be.visible')
        //Given: user navigates to the Draiver web site
        //When: user navigates to the login page
        //Then: user can see all the page components
    })


    it('Login page - Title', () => {
        cy.get(loginPage.PAGE_TITLE)
            .should('be.visible')
            .should('have.text', 'Moving Vehicles on Autopilot')
            .should('css', 'font-color', 'rgb(232, 232, 232)')
            .should('css', 'font-size', '18px')
            .should('css', 'font-weight', '700')
            .should('css', 'font-family', 'Rotobo')
        //Given: user navigates to the Draiver web site
        //When: user navigates to the login page
        //Then: user can see the page title 'Moving Vehicles on Autopilot'
    })

    it('Login page - Fields', () => {
        cy.get(loginPage.USERNAME_FIELD)
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Username')

        cy.get(loginPage.PASSWORD_FIELD)
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Password')
        //Given: user navigates to the Draiver web site
        //When: user navigates to the login page
        //Then: user can see the login fields
    })

    it('Login page - Create an account link', () => {
        cy.get('div>div>a[class*=btn]')
            .should('be.visible')
            .should('have.text', 'CREATE AN ACCOUNT')
            .should('css', 'font-color', 'rgb(255, 255, 255)')
            .should('css', 'font-size', '17px')
            .should('css', 'font-weight', '400')
            .click()
        cy.url().should('contain', 'registration.draiver.net')
        //Given: user navigates to the login page
        //When: user clicks on the create an account link
        //Then: user is redirected to the registration.draiver.net page
    })

    it('Login page - Both Fields missing', () => {
        cy.get(loginPage.LOGIN_BUTTON)
            .should('be.visible')
            .should('have.text', 'LOG IN')
            .should('css', 'background-color', 'rgb(43, 118, 226)')
            .should('css', 'font-color', 'rgb(255, 255, 255)')
            .should('css', 'font-size', '15px')
            .should('css', 'font-weight', '500')
            .should('css', 'font-family', 'Rotobo')
            .click()
        cy.get(loginPage.USERNAME_ERROR_MESSAGE)
            .should('be.visible')
            .should('have.text', 'Please enter your email.')
            .should('css', 'font-color', 'rgb(244, 67, 54)')
            .should('css', 'font-size', '12.8px')
            .should('css', 'font-weight', '500')
            .should('css', 'font-family', 'Rotobo')
        cy.get(loginPage.PASSWORD_ERROR_MESSAGE)
            .should('be.visible')
            .should('have.text', 'Please enter your password.')
            .should('css', 'font-color', 'rgb(244, 67, 54)')
            .should('css', 'font-size', '12.8px')
            .should('css', 'font-weight', '500')
            .should('css', 'font-family', 'Rotobo')
        //Given: user navigates to the login page
        //When: user clicks on the Login button withput completing emails and password fields
        //Then: user can see the two error messages, one for the email and one for the password


    })

    it('Login page - Email Field missing', () => {
        cy.get(loginPage.PASSWORD_ERROR_MESSAGE).type(password)
        cy.get(loginPage.LOGIN_BUTTON)
            .click()
        cy.get(loginPage.USERNAME_ERROR_MESSAGE)
            .should('be.visible')
            .should('have.text', 'Please enter your email.')
        cy.get(loginPage.PASSWORD_ERROR_MESSAGE)
            .should('not.exist')
        //Given: user navigates to the login page
        //When: user complete the password field
        //AND
        //When: user clicks on the login button
        //Then: user can see an error message for the email field

    })

    it('Login page - Password Field missing', () => {
        cy.get(loginPage.USERNAME_ERROR_MESSAGE).type(user)
        cy.get(loginPage.LOGIN_BUTTON)
            .click()
        cy.get(loginPage.PASSWORD_ERROR_MESSAGE)
            .should('be.visible')
            .should('have.text', 'Please enter your password.')
        cy.get(loginPage.USERNAME_ERROR_MESSAGE)
            .should('not.exist')
        //Given: user navigates to the login page
        //When: user complete the email field
        //AND
        //When: user clicks on the login button
        //Then: user can see an error message for the password field

    })

    it('Successful Login', () => {
        cy.get(loginPage.USERNAME_FIELD)
            .should('be.visible')
            .type(user)
        cy.get(loginPage.PASSWORD_FIELD)
            .should('be.visible')
            .type(password)
        cy.get(loginPage.LOGIN_BUTTON).click()
        cy.url().should('contain', '/home')
        //Given: user navigates to the login page
        //When: user complete the email and password fields
        //AND
        //When: user clicks on the login button
        //Then: login is successful and user is redirected to the home page


    })
})

