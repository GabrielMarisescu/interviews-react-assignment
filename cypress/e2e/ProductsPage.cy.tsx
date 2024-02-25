describe('Mounts the FreshCard Market App', () => {
    //No Need to add a mock since we are already mocking it in the main app.
    //otherwise I would create a mock for the products.
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })
    it('should display the products', () => {})
})
