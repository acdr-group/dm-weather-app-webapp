import {SensorName} from "../../models/sensor";

describe("Analysis page spec", () => {

    const initialRequestUrl = "http://localhost:8080/readings?start=2022-08-31T22:00:00.000Z&end=2022-09-19T22:00:00.000Z&stations=106&sensors=1"

    beforeEach(() => {
        cy.intercept("GET", initialRequestUrl).as("getReadings")
        cy.visit("/analysis")
    })

    it("Should contain required content", () => {
        cy.get("[data-cy='page-title']").contains("Analysen")
        cy.contains("Sensor")
        cy.contains("Ab")
        cy.contains("Bis")
    })

    it("Should load required data for the current page", () => {

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

})

// Prevent TypeScript from reading file as legacy script
export {}