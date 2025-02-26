describe('API - Profile', () => {

    context('todos os perfis', () => {


        it('valida a API de perfis', () => {

            cy.log('Teste de texto')
            cy.request({
                method: 'GET',
                url: '/api/profile'
            }).then(({ status, duration, body, headers}) =>{
                expect(status).to.eq(200)
                expect(duration).to.be.lessThan(10000)
                expect(body[0].status).to.eq('Gerente de Testes')
                expect(body[0].user.name).to.eq('Pedro Guerra')
                expect(body[0].skills[0]).to.eq('Cypress')
                expect(body[0].skills).to.have.lengthOf(1)
                expect(body[0].date).to.not.be.null
                expect(headers['x-powered-by']).to.eq('Express')
            })
        })
    })  

    context('perfil especifico', () => {

        it('seleciona um usuario invalido', () => {

            cy.request({
                method: 'GET',
                url: '/api/profile/user/1',
                failOnStatusCode: false
            }).then(({status, body}) => {
                expect(status).to.eq(404)
                expect(body.errors[0].mensagem).to.eq('perfil nao encontrado')
            })
        })


        it ('valida um usuario valido',() =>{
            let usuario = '637d72b91fb5cb0015a02259'

            cy.request({
                method: 'GET',
                url: `/api/profile/user/${usuarioId}`
            }).then(({status, body }) => {
                expect(status).to.eq(200)
            })  
        })

        it('valida um usuario valido buscando na base', () => {

            cy.request({
                method: 'GET',
                url: '/api/profile'  
            }).then(({body }) => {

                cy.request({
                    method: 'GET',
                    url: `/api/profile/user/${body[1].user._id}`
                }).then(({status, body}) =>{
                    expect(status).to.eq(200)
                    expect(body.status).to.eq('Outro')
                })
            })
        })
    })
})