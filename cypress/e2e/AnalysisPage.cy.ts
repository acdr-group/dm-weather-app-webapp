describe('Analysis page spec', () => {
    it('Should navigate to the analysis page', () => {
        cy.visit('/analysis')
        cy.get("[data-cy='page-title']").contains("Analysen")
    })
})

// Prevent TypeScript from reading file as legacy script
export {}