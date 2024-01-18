# dm Weather-WebApp

This is the frontend for the dm Weather App. It is written in JavaScript and uses Next.js. Cypress is used for testing.
## Getting Started
Set environment variables:
```
EXPO_PUBLIC_BACKEND_SERVER_HOST=192.168.0.174
EXPO_PUBLIC_BACKEND_SERVER_PORT=8080
EXPO_PUBLIC_BACKEND_SERVER_URL=http://172.162.240.33/dm-weather-app-backend
EXPO_PUBLIC_WEATHER_DATA_PROVIDER=OpenWeather
EXPO_PUBLIC_WEATHER_DATA_PROVIDER_HOMEPAGE=https://openweathermap.org/
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_PUBLIC_LAST_RELEASE_DATE=06.02.2024
```

Install Node.js and npm:

https://nodejs.org/en/download/current/

Then, install the dependencies:
`npm install`

Now, you can run the development server:
`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To stop the development server, press `Ctrl+C` in the terminal.

## Testing
To run the tests, run:
`cypress run --headless` or
`start-server-and-test dev http://localhost:3000 cypress:headless`

## Docker
Im Wurzelverzeichnis DB starten:
`docker compose up`

Docker Image des Projekts bauen:
`docker buildx build <IMAGE_NAME_UND_TAG>`

Umgebungsvariablen je nach Umgebung setzen (Dies kann auch in die compose.yaml Datei fürs Docker-Image gesetzt werden):
`WEATHERAPPAUTHENTICATION_ACCESSTOKEN=86c42a625b5936d0f923264babb0dd90 & WEATHERAPPAUTHENTICATION_APIBASEURL=https://api.openweathermap.org/data`