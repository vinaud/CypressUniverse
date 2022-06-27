// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import moment from 'moment';
import loginPage from '../support/pages/login';
import dashPage from '../support/pages/dashboard';

const apiServer = Cypress.config().apiServer

Cypress.Commands.add('uiLogin', function (user) {
    loginPage.go();
    loginPage.form(user);
    loginPage.submit();
    dashPage.header.userLoggedIn(user.name);

});

Cypress.Commands.add('postUser', function (user) {

    cy.task('removeUser', user.email).then(function (result) {
        console.log(result);
    });

    cy.request(
        'POST',
        apiServer + '/users',
        user
    ).then(function (response) {
        expect(response.status).to.be.equal(200);
    });

});

Cypress.Commands.add('recoveryPass', function (email) {

    cy.request(
        'POST',
        apiServer + '/password/forgot',
        { email: email }
    ).then(function (response) {
        expect(response.status).to.be.equal(204);

        cy.task('findToken', email).then(function (result) {
            Cypress.env('recoveryToken', result.token);
        })
    });

});

Cypress.Commands.add('createAppointment', function (appointmentHour) {
    let now = new Date();
    now.setDate(now.getDate() + 1);

    var day = now.getDay();
    var isWeekend = (day === 6) || (day === 0);
    if (isWeekend) {
        now.setDate(now.getDate() + 2);
    }

    Cypress.env('appointmentDay', now.getDate())

    const date = moment(now).format(`YYYY-MM-DD ${appointmentHour}:00`);

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date
    }

    cy.request({
        method: 'POST',
        url: apiServer + '/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200);
    });
});

Cypress.Commands.add('setProviderId', function (providerEmail) {

    cy.request({
        method: 'GET',
        url: apiServer + '/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200);
        cy.log(response.body);

        const providerList = response.body;
        providerList.forEach(function (provider) {
            if (provider.email == providerEmail) {
                Cypress.env('providerId', provider.id);
            }
        })
    });
});

Cypress.Commands.add('apiLogin', function (user, setLocalStorage = false) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: apiServer + '/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200);
        Cypress.env('apiToken', response.body.token);

        if (setLocalStorage) {
            const { token, user } = response.body;
            window.localStorage.setItem('@Samurai:token', token);
            window.localStorage.setItem('@Samurai:user', JSON.stringify(user));
        }

    });

    if (setLocalStorage)
        cy.visit('/dashboard');
})