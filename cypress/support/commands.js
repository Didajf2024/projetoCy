import Ajv from 'ajv'

Cypress.Commands.add('login', (email, senha) => {

    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: {
            email,
            senha
        }
    }).then(() =>{
        Cypress.Cookies.defaults({
            preserve: 'jwt'
        })
    })
})

Cypress.Commands.add('testeContrato' , () => {

    //função que mostra os erros
    const getSchemaError = (ajvErros) => {
        return cy.wrap(
            `Campo: ${ajvErros[0]['instancePath']} é valido. Erro: ${ajvErros[0['message']]}`
        )
    }
})