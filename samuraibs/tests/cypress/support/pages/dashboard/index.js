import { el } from './elements';
import header from '../components/header'

class DashPage{

    constructor(){
        this.header = header;
    }

    calendarShouldBeVisible(){
        cy.get(el.dayPicker, {timeout: 7000}).should('be.visible');
    }

    selectDay(day){

        let today = new Date();
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        if(today.getDate() === lastDayOfMonth.getDate()){
            cy.log('estamos no ultimo dia do mes');

            cy.get(el.nextMonthButton).should('be.visible').click();
        }
        else{
            cy.log('hoje não é o ultimo dia do mês')
        }

        const target = new RegExp('^' + day + '$', 'g');
        cy.contains(el.daySelect, target).click({force: true});
    }

    appointmentShouldBeVisible(customer, hour){
        cy.contains('div', customer.name).should('be.visible')
        .parent()
        .contains(el.boxHour, hour).should('be.visible');
    }
}

export default new DashPage();