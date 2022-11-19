let datos;
before(() => {
    cy.fixture("datos_prueba").then ((fData) => {
        datos = fData;
    });
    cy.visit("http://zero.webappsecurity.com/index.html");
});


describe ("Pruebas pagina de inicio", function () {

    it('Validacion encabezado superior', function () {
        cy.get('.active > img').should("be.visible")
        cy.get('.active > .custom > h4').contains("Online Banking")
        cy.get('.active > .custom').contains("Welcome to Zero Online Banking. Zero provides a greener and more convenient way to manage your money. Zero enables you to check your account balances, pay your bills, transfer money, and keep detailed records of your transactions, wherever there is an internet connection.")
    });

    it('Validacion columnas inferiores', function () {
        cy.get('#online_banking_features > :nth-child(1) > h4').contains("Online Banking")
        cy.get('#account_activity_link').contains("Checking Account Activity")
        cy.get('#transfer_funds_link').contains("Transfer Funds")
        cy.get('#money_map_link').contains("My Money Map")
    });

})

describe("Prueba E2E Transferencia de fondos", function () {

    it('Prueba 1 transeferencia de fondos de ahorros a t.credito', function () {
        cy.get('#signin_button').click()
        cy.get('#user_login').type(datos.user)
        cy.get('#user_password').type(datos.password)
        cy.get('.btn').click()
        cy.get('#transfer_funds_tab > a').click()
        cy.get('#tf_fromAccountId').select(3)
        cy.get('#tf_toAccountId').select(5)
        cy.get("#tf_amount").type("500")
        cy.get("#tf_description").type("Prueba de transefencia de ahorros a credito")
        cy.get('#btn_submit').click()
        cy.get('#btn_submit').click()
        cy.get('.alert').should("contain.text","You successfully submitted your transaction.")
        cy.get('.board-content').should("be.visible")
    });
})
