describe('app works correctly with routes', function () {
    before(function () {
        cy.visit('http://localhost:3000');
    });

    it('should open burger page by default', function () {
        cy.contains('Соберите бургер');
    });

    it('should open delivery page after continue button click', function () {
        cy.get('button').contains('Лента заказов').click();
        cy.contains('Готовы');
    });

    it('should open profile page or login form', function () {
        cy.get('button').contains('Личный кабинет').click();
        cy.contains(/(Профиль|Вход)/);
    });
});