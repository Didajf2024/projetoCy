import Ajv from 'ajv'
import { definitionHelper } from '../utils/schemaDefinitions'

//Loga na aplicação via API
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

//Executa teste de contrato em uma API
Cypress.Commands.add('testeContrato' , (schema, resposta) => {

    //função que mostra os erros
    const getSchemaError = (ajvErros) => {
        return cy.wrap(
            `Campo: ${ajvErros[0]['instancePath']} é valido. Erro: ${ajvErros[0['message']]}`
        )
    }

    // iniciar o AJV
    const ajv = new Ajv()
    const validacao = ajv.addSchema(definitionHeloer).compile(schema)
    const valido = validate(resposta)

    // verificação se o schema passou ou falhou
    if (!valido) {
        getSchemaError(validate.erros).then(schemaError => {
            throw new Error(schemaError)
        })
    } else
        expect(valido).to.be.true
})

// Seleciona um elemento pelo atributo data-test
Cypress.Commands.add('getElement', seletor => {
    return cy.get(`[data-test=${seletor}]`)
})