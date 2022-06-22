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
            }
        }

        before(function () {
            cy.postUser(data.provider);
            cy.postUser(data.customer);
            
            cy.apiLogin(data.customer)
        })

        it('deve ser exibido no dashboard', function () {
            console.log(data)
        });
    });
});

Cypress.Commands.add('apiLogin', function (user) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(function(response){
        expect(response.status).to.eq(200);
        Cypress.env('apiToken', response.body.token);
    });
})