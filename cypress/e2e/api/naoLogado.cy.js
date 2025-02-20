describe('API - Profile', () => {

    context('todos os perfis', () => {


        it('valida a API de perfis', () => {

            cy.log('Teste de texto')
            cy.request({
                method: 'GET',
                url: '/api/profile'
            }).then(respostaAPI =>{
                expect(respostaAPI.status).to.eq(200)
                expect(respostaAPI.duration).to.be.lessThan(10000)
                expect(respostaAPI.body[0].status).to.eq('Gerente de Testes')
                expect(respostaAPI.body[0].user.name).to.eq('Pedro Guerra')
                expect(respostaAPI.body[0].skills[0]).to.eq('Cypress')
                expect(respostaAPI.body[0].skills).to.have.lengthOf(1)
                expect(respostaAPI.body[0].date).to.not.be.null
                expect(respostaAPI.headers['x-powered-by']).to.eq('Express')
            })
        })
    })  

    context('perfil especifico', () => {

        it('seleciona um usuario invalido', () => {

            cy.request({
                method: 'GET',
                url: '/api/profile/user/1',
                failOnStatusCode: false
            }).then(respostaAPI => {
                expect(respostaAPI.status).to.eq(404)
                expect(respostaAPI.body.errors[0].mensagem).to.eq('perfil nao encontrado')
            })
        })
    })
})100