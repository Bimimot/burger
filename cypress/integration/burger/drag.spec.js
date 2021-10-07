
describe('drag images', function () {
    before(function () {
        cy.visit('http://localhost:3000');
    });

    it('should drag & leave first image', function () {

        cy.get('li>img').first().trigger("dragstart").trigger("dragleave");

        cy.get('#dropContainer')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");
    });
});