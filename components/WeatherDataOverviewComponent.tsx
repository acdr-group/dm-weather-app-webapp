/* eslint-disable react/display-name */
import React from "react";
import {Box} from "@mui/joy";
import {useApplicationContext} from "@/contexts/applicationContext";
import useFetch from "@/hooks/useFetch";
import {SxProps} from "@mui/system";
import OverviewCardComponent from "@/components/OverviewCardComponent";
import TemperatureForecastForNextHoursComponent from "@/components/TemperatureForecastForNextHoursComponent";
import KeyValueCardListComponent from "@/components/KeyValueCardListComponent";
import WeeklyTemperaturesCardComponent from "@/components/WeeklyTemperaturesCardComponent";
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WifiTetheringOutlinedIcon from "@mui/icons-material/WifiTetheringOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import {KeyValue, ListEntry, TemperaturesForPeriodsOfTheDay} from "@/app/page";
import ErrorComponent from "@/components/shared/ErrorComponent";
import {Weather} from "@/api/weather";
import {Forecast} from "@/api/forecast";
import {SuggestionComponent} from "@/components/SuggestionComponent";
import LoadingComponent from "@/components/shared/LoadingComponent";

/**
 * React functional component that displays the weather data overview.
 *
 * @returns JSX.Element - The rendered component.
 */
const WeatherDataOverviewComponent: React.FC = () => {

    const applicationContext = useApplicationContext()

    const {
        data: weather,
        isLoading: isWeatherDataLoading,
        error: errorOnLoadingWeatherData,
    } = useFetch<Weather>(applicationContext.getWeather())

    const {
        data: forecast,
        isLoading: isForecastDataLoading,
        error: errorOnLoadingForecastData,
    } = useFetch<Forecast>(applicationContext.getForecast())

    const getOverviewValues = (): ListEntry[] => {
        return [
            {
                icon: <CompressOutlinedIcon/>,
                value: weather.pressure,
                unit: "hPa",
            },
            {
                icon: <WaterDropOutlinedIcon/>,
                value: weather.humidity.toFixed(),
                unit: "%",
            },
            {
                icon: <AirOutlinedIcon/>,
                value: weather.windSpeed.toFixed(),
                unit: "m/s",
            },
            {
                icon: <WbSunnyOutlinedIcon/>,
                value: weather.sunrise.toLocaleString("de-DE", {hour: "2-digit", minute: "2-digit"}),
                unit: "",
            },
            {
                icon: <DarkModeOutlinedIcon/>,
                value: weather.sunset.toLocaleString("de-DE", {hour: "2-digit", minute: "2-digit"}),
                unit: "",
            },
        ]
    }
    const getTemperatureInAnHour = (hour: number, timeStamps: string[], values: number[]): number => {
        const timeStampFound = timeStamps
            .filter(t => new Date(t).getDate() === new Date().getDate())
            .filter(t => new Date(t).getHours() === hour)
            .filter(t => new Date(t).getMinutes() === 0)[0]
        const timeStampIndex = timeStamps.indexOf(timeStampFound)
        return values[timeStampIndex]
    }

    const getTemperaturesForPeriodsOfTheDay = (): TemperaturesForPeriodsOfTheDay[] => {
        const timeStamps = forecast.weatherList.map(w => new Date(w.dateTime).toISOString())
        const values = forecast.weatherList.map(w => w.temp)

        return [
            {
                dayPeriod: "Morgen",
                value: getTemperatureInAnHour(9, timeStamps, values),
                unit: "°C",
            },
            {
                dayPeriod: "Nachmittags",
                value: getTemperatureInAnHour(15, timeStamps, values),
                unit: "°C",
            },
            {
                dayPeriod: "Abend",
                value: getTemperatureInAnHour(19, timeStamps, values),
                unit: "°C",
            },
            {
                dayPeriod: "Nacht",
                value: getTemperatureInAnHour(22, timeStamps, values),
                unit: "°C",
            },
        ]
    }

    const getKeyValues = (): KeyValue[] => {
        return [
            {
                title: "Gefühlt",
                value: weather.feelsLike.toFixed(),
                unit: "°",
                icon: <WifiTetheringOutlinedIcon/>,
            },
            {
                title: "Höchste Temp.",
                value: weather.tempMax.toFixed(),
                unit: "°",
                icon: <WifiTetheringOutlinedIcon/>,
            },
            {
                title: "Niedrigste Temp.",
                value: weather.tempMin.toFixed(),
                unit: "°",
                icon: <WifiTetheringOutlinedIcon/>,
            },
        ]
    }

    const getWeatherOfCurrentDayFromForecast = (): Weather[] => {
        return forecast.weatherList
            .filter(wl => wl.dateTime.getDate() === new Date().getDate() ||
                wl.dateTime.getDate() === new Date().getDate() + 1
            ).slice(0, 10)
    }

    if (isWeatherDataLoading) return <LoadingComponent message={"Wetterdaten werden geladen..."}/>

    if (isForecastDataLoading) return <LoadingComponent message={"Vorsagen werden geladen..."}/>

    if (errorOnLoadingWeatherData) return <ErrorComponent message={errorOnLoadingWeatherData.toString()}/>

    if (errorOnLoadingForecastData) return <ErrorComponent message={errorOnLoadingForecastData.toString()}/>

    return (
        <Box>
            <Box sx={overviewWrapper}>
                <Box sx={overviewCardAndFilterContainer}>
                    <OverviewCardComponent
                        description={weather.description}
                        measurementDate={weather.dateTime}
                        overviewWeatherValues={getOverviewValues()}
                        currentTemperatureAndUnit={`${weather.temp.toFixed()}°`}
                        temperaturesForPeriodsOfTheDay={getTemperaturesForPeriodsOfTheDay()}
                    />
                    <TemperatureForecastForNextHoursComponent
                        weatherList={getWeatherOfCurrentDayFromForecast()}
                    />
                    <KeyValueCardListComponent keyValues={getKeyValues()}/>
                </Box>
                <Box sx={SuggestionAndWeeklyTemperatureContainer}>
                    <SuggestionComponent weatherIcon={weather.icon} />
                    <WeeklyTemperaturesCardComponent forecast={forecast} />
                </Box>
            </Box>
        </Box>
    )
};

const overviewWrapper: SxProps = {
    display: "grid",
    gridTemplateColumns: {
        lg: "5fr 2fr",
        md: "1fr",
        xs: "1fr",
    },
    gap: 2,
}
const overviewCardAndFilterContainer: SxProps = {
    display: "grid",
    gap: 2,
}
const SuggestionAndWeeklyTemperatureContainer: SxProps = {
    display: "grid",
    gap: 2,
    gridTemplateRows: "max-content 1fr",
}
export default WeatherDataOverviewComponent
