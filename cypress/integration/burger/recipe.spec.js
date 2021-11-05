import {baseUrl} from '../../../src/utils/api'

describe('drag images', function () {
    before(function () {
        cy.visit('http://localhost:3000');

        
    });


    it('should get random receipe & clear it', function () {

        // cy.intercept({ method: "GET", url: "https://norma.nomoreparties.space/api/ingredients"}).as('getFoods');
        // cy.wait('@getFoods');
        
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('button').contains('Рецепт от нашего робота').click();
        cy.contains('Оформить заказ');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('button').contains('Сбросить рецепт').click();
        cy.get('#dropContainer > div').should('not.exist');        
    });
});