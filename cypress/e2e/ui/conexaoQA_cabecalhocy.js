describe('cabeçalho da pagina home', () => {

    context('não logado', () => {

        before(() => {
            cy.visit('/')
        })

        it('valida o cabecalho', () => {

            //Conexao QA
            cy.getElement('navbar-conexaoQA')
                .should('have.attr', 'href', '/')
                .and('not.have.attr', 'target', '_blank')
            
            //QAs
            cy.getElement('navbar-QAs')
                .should('have.attr', 'href', '/perfis')
                .and('not.have.attr', 'target', '_blank')
            
            //Sobre
            cy.getElement('navbar-about')
                .should('have.attr', 'href', '/sobre')
                .and('not.have.attr', 'target', '_blank')
        })
    })

    context('logado', () => {

    })
})
