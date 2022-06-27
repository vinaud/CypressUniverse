import loginPage from '../support/pages/login';
import dashPage from '../support/pages/dashboard';
import { customer, provider, appointment } from '../support/factories/dash';

describe('dashboard', function () {
    context('quando o cliente faz um agendamento no app mobile', function () {

        before(function () {
            cy.postUser(provider);
            cy.postUser(customer);
            
            cy.apiLogin(customer);
            cy.setProviderId(provider.email);
            cy.createAppointment(appointment.hour);
        })

        it('deve ser exibido no dashboard', function () {
            loginPage.go();
            loginPage.form(provider);
            loginPage.submit();
            cy.wait(3000);

            dashPage.calendarShouldBeVisible();
            dashPage.selectDay(Cypress.env('appointmentDay'));
            dashPage.appointmentShouldBeVisible(customer, appointment.hour);
            
        });
    });
});

