describe('CRUD - Posts', () => {

    let postId = ''
    let mensagem = 'Este post foi feito pelo Cypress'

    before(() => {

        cy.login(Cypress.env('email'), Cypress.env('password'))
    })
    
    it('cria um post', () => {


        cy.request({

         method:'POST',
         url: '/api/post',
         body:{
            text: mensagem
         }   
        }).then(({status, body}) => {
            expect(status).to.eq(201)
            expect(body.text).to.eq(mensagem)
            postId = body._id
        })
    })


    it('lê o post', () => {

        cy.request({
            method:'GET',
            url: `/api/posts/${postId}`
        }).then(({status, body}) =>{
            expect(status).to.eq(200)
            expect(body.text).to.eq(mensagem)
            expect(body.likes).to.have.lenghtOf(0)
        })
    })

    it('atualiza o post', () => {

        cy.request({
            method: 'PUT',
            url: `/api/posts/like/${postId}`
        }).then(({status}) => {
            expect(status).to.eq(200)

            cy.request({
                method:'GET',
                url: `/api/posts/${postId}`
            }).then(({body}) =>{
               expect(body.likes).to.have.lenghtOf(1)
            })
        })
    })

    it('deleta o post', () => {
        
        cy.request({
            method: 'DELETE',
            url: `/api/post/${postId}`
        }).then(({ status, body }) =>{
           expect(status).to.eq(200)
           expect(body,msg).to.eq('Post removido')

           cy.request({
           method: 'GET',
           url: `/api/post/${postId}`,
           failOnStatusCode: false
           }).then(({status}) => {
              expect(status).to.eq(400)
           })
        })
    })
})