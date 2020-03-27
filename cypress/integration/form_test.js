describe ("test the form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza")
    })
    it("completes form and submits", () => {
        cy.get('#name')
        .type("gabby")
        .should("have.value", "gabby"),
        cy.get('#size')
        .select("small")
        .should("have.value", "small"),
        cy.get('#sauce')
        .select("bbq")
        .should("have.value", "bbq"),
        cy.get('#special')
        .type("gabby")
        .should("have.value", "gabby"),
        cy.get('[type="checkbox"]')
        .check(),
        cy.get("button").click();
    })
    
})