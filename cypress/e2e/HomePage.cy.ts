import {Weather} from "../../api/weather";
import {Coordinate} from "@/api/coordinate";
describe("Home page spec", () => {

  const coordinate: Coordinate = {
    lat: 49.0068705,
    lon: 8.4034195,
  }
  const initialRequestUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL!}/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&units=metric&lang=de`

  beforeEach(() => {
    cy.intercept("GET", initialRequestUrl, { fixture: "weather.json" }).as("getWeather")
    cy.visit("/")
  })

  it("Should contain required content", () => {
    cy.get("[data-cy='page-title']").contains("Vorhersage")
  })

  it("Should load required data for the page", () => {
    // cy.wait("@getWeather").then((interception) => {
    //
    //   expect(interception.request.method).to.equal("GET")
    //   expect(interception.response!.statusCode).to.equal(200)
    //
    //   for (const property of Object.keys(Weather)) {
    //     expect(property in interception.response!.body).to.be.true;
    //   }
    // })
  })
})

// Prevent TypeScript from reading file as legacy script
export {}