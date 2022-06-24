import loginPage from '../support/pages/login';
import dashPage from '../support/pages/dashboard';

describe('dashboard', function () {
    context('quando o cliente faz um agendamento no app mobile', function () {

        const data = {
            customer: {
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'ramon@televisa.com',
                password: 'pwd123',
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        before(function () {
            cy.postUser(data.provider);
            cy.postUser(data.customer);
            
            cy.apiLogin(data.customer);
            cy.setProviderId(data.provider.email);
            cy.createAppointment(data.appointmentHour);
        })

        it('deve ser exibido no dashboard', function () {
            loginPage.go();
            loginPage.form(data.provider);
            loginPage.submit();
            cy.wait(3000);

            dashPage.calendarShouldBeVisible();
            dashPage.selectDay(Cypress.env('appointmentDay'));
            dashPage.appointmentShouldBeVisible(data.customer, data.appointmentHour);
            
        });
    });
});

