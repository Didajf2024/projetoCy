const { it, beforeEach } = require("mocha")

    describe('cabeçalho da pagina home', () => {

        const validaMenu = (seletor, link) => {
                
                cy.getElement(seletor)
                    .should('have.attr', 'href', link)
                    .and('not.have.attr', 'target', '_blank')
                    .and('have.text', menu)
            
        }

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
            
            //Cadastrar
            cy.getElement('navbar-register')
                .should('have.attr', 'href', '/cadastrar')
                .and('not.have.attr', 'target', '_blank')
                
            //Login
            cy.getElement('navbar-login')
                .should('have.attr', 'href', '/login')
                .and('not.have.attr', 'target', '_blank')
        })

        it.skip('valida o cabeçalho utilizando object', () => {

            const menus = [
                { seletor: 'navbar-conexaoQA', link:'/' },
                { seletor: 'navbar-QAs', link:'/perfis' },
                { seletor: 'navbar-about', link:'/sobre' },
                { seletor: 'navbar-register', link:'/cadastrar' },
                { seletor: 'navbar-login', link:'/login' },
            ]

            menus.forEach(({ seletor, link }) =>{

                validarMenu(seletor, link)
            })
        })

        ;[
            { seletor: 'navbar-conexaoQA', link:'/',menu: ' ConexãoQA' },
            { seletor: 'navbar-QAs', link:'/perfis',menu: 'QAs' },
            { seletor: 'navbar-about', link:'/sobre',menu: 'Sobre' },
            { seletor: 'navbar-register', link:'/cadastrar',menu: 'Cadastrar' },
            { seletor: 'navbar-login', link:'/login',menu: 'Login' },
        ].forEach(({ seletor, link, menu}) => {

            it(`valida o menu ${menu} - Teste Dinamico`, () => {
                
                validarMenu(seletor, link, menu)
            })
        })
    })

    context('logado', () => {

        //contruindo meu estado
        before(() => {
            cy.login(Cypress.env('email'), Cypress.env('senha'))
            
        })
        
        beforeEach(()=> {
            cy.visit('/')
        })
        after(() =>{
            Cypress.Cookies.defaults({
                preserve: []
            })
        })

        ;[
            { seletor: 'navbar-conexaoQA', link:'/',menu: 'ConexãoQA' },
            { seletor: 'navbar-QAs', link:'/perfis',menu: 'QAs' },
            { seletor: 'navbar-about', link:'/posts',menu: 'Posts' },
            { seletor: 'navbar-register', link:'/dashboard',menu: 'Dashboard' },
            { seletor: 'navbar-login', link:'/sobre',menu: 'Sobre' },
            { seletor: 'navbar-login', link:'/',menu: 'Sair' },
        ].forEach(({seletor, link, menu}) => {

            it(`valida o menu ${menu} - Teste Dinamico`, () => {
                
               validarMenu(seletor, link, menu)
            })
        })
    })
})
