describe('page navigation', function () {
    before(function () {

        cy.visit('http://localhost:3000');
    });

    it('open sauce', function () {

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('a').contains('Соусы').click();
        cy.contains('Соус Spicy-X');

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);

        cy.get('a').contains('Начинка').click();
        cy.contains('Филе');

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);

        cy.get('a').contains('Булки').click();
        cy.contains('Краторная булка');
    });

});