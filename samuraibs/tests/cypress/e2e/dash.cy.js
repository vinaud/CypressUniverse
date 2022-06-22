describe('dashboard', function(){
    context('quando o cliente faz um agendamento no app mobile', function(){

        const data = {
            customer:{
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            samurai: {
                name: 'Ramon Valdes',
                email: 'ramon@televisa.com',
                password: 'pwd123',
                is_provider: true
            }
        }

        before(function(){
            cy.postUser(data.customer);
            cy.postUser(data.samurai);
        })

        it('deve ser exibido no dashboard', function(){
            console.log(data)
        });
    });
});