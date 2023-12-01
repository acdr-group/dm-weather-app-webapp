describe("Home page spec", () => {

  const initialRequestUrl = "http://localhost:8080/readings?start=2022-09-01T00:00:00.000Z&end=2022-09-01T23:00:00.000Z&stations=106&sensors=%0A++++++++++++1,%0A++++++++++++4,%0A++++++++++++5,%0A++++++++++++3,%0A++++++++++++2,%0A++++++++++++6%0A++++++++"

  beforeEach(() => {
    cy.intercept("GET", initialRequestUrl).as("getReadings")
    cy.visit("/")
  })

  it("Should contain required content", () => {
    cy.get("[data-cy='page-title']").contains("Vorhersage")
  })

  it("Should load required data for the page", () => {

    cy.wait("@getReadings").then((interception) => {

      expect(interception.request.method).to.equal("GET")
      expect(interception.response.statusCode).to.equal(200)
      expect("sensorMeasurements" in interception.response.body).to.be.true;

      interception.response.body.sensorMeasurements.forEach(sensorMeasurement => {
        expect(sensorMeasurement).to.have.property("id").and.be.a("number");
        expect(sensorMeasurement).to.have.property("avg").and.be.a("number");
        expect(sensorMeasurement).to.have.property("max").and.be.a("number");
        expect(sensorMeasurement).to.have.property("min").and.be.a("number");
        expect(sensorMeasurement).to.have.property("name").and.be.a("string");
        expect(sensorMeasurement).to.have.property("unit").and.be.a("string");
        expect(sensorMeasurement).to.have.property("values").and.be.an("array").and.to.have.length.at.least(1);
        expect(sensorMeasurement).to.have.property("description").and.be.a("string");
        expect(sensorMeasurement).to.have.property("max_abs").and.be.a("number");
        expect(sensorMeasurement).to.have.property("min_abs").and.be.a("number");
        expect(sensorMeasurement).to.have.property("public_name").and.be.a("string");
        expect(sensorMeasurement).to.have.property("running_sum").and.be.an("array");
      });
    })
  })

  it("Should select date to load weather of that date", () => {

    const date1 = "2022-09-15"
    const date2 = "2022-09-14"
    const date3 = "2022-09-13"
    const date4 = "2022-08-15"
    const date5 = "2022-08-10"
    const date6 = "2022-08-05"
    const date7 = "2022-07-05"
    const date8 = "2022-07-10"
    const date9 = "2022-07-20"

    cy.get("[data-cy='date-selection-input']")
        .click().type(date1)
        .click().type(date2)
        .click().type(date3)
        .click().type(date4)
        .click().type(date5)
        .click().type(date6)
        .click().type(date7)
        .click().type(date8)
        .click().type(date9)
  })

  it("Should contain temperatures of the day from 12 AM to 12 PM", () => {
    cy.get("[data-cy='twenty-four-hours-temperature-container']")
        .children().should('have.length', 24)

    cy.get("[data-cy='twenty-four-hours-temperature-container']")
        .children().each(($el) => {
          cy.wrap($el).click();
    });
  })

})

// Prevent TypeScript from reading file as legacy script
export {}