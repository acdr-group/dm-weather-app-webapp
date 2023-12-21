import React, {useEffect, useMemo, useCallback} from "react";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import {Box, Divider, Stack} from "@mui/joy";
import {SxProps} from "@mui/system";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import LinearProgress from "@mui/joy/LinearProgress";
import {START_DATE_STAMP_OF_BACKWARDS_DELIVERY_OF_DATA, useApplicationContext} from "@/contexts/applicationContext";
import {SensorId} from "@/models/sensor";
import ErrorComponent from "@/components/shared/ErrorComponent";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import {v4 as uuid} from "uuid"
import useFetch from "@/hooks/useFetch";
import {Forecast} from "@/api/forecast";
import {Weather} from "@/api/weather";
import Image from "next/image";

type TemperatureValuesOfADay = {
    day: Date
    min: number
    max: number
    avg: number
    unit: string
    icon: any
}

const WeeklyTemperaturesCardComponent: React.FC = () => {

    const applicationContext = useApplicationContext()

    const {
        data: forecast,
        isLoading: isForecastDataLoading,
        error: errorOnLoadingForecastData,
    } = useFetch<Forecast>(applicationContext.getForecast())

    useEffect(() => {
        if (!forecast) return
        extractDatesFromWeatherList(forecast.weatherList)
    }, [forecast]);

    const extractDatesFromWeatherList = useCallback((weatherList: Weather[]): Weather[] => {
        return weatherList.reduce((acc: Weather[], curr: Weather) =>
            (acc as Weather[])
                .find(w => w.dateTime.getDate() === curr.dateTime.getDate()) ?
                    acc : [...acc, curr]
        , [])
    }, []);

    const resolveDaysFromForecast = (): TemperatureValuesOfADay[] => {
        if (forecast === undefined) return []
        return extractDatesFromWeatherList(forecast.weatherList).map(w => {
            return {
                day: w.dateTime,
                min: Number(w.tempMin.toFixed(1)),
                max: Number(w.tempMax.toFixed(1)),
                avg: Number(w.tempMin + w.tempMax / 2),
                unit: "°C",
                icon: <Image
                    src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                    loader={() => `https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                    width={55}
                    height={55}
                    alt={"weather-indicator"}
                />,
            }
        }).slice(0, 5)
    }

    const temperatureValues = useMemo(() => resolveDaysFromForecast(), [forecast]);

    const formatDate = useCallback((date: Date): string => {
        return date.toLocaleDateString()
    }, []);

    if (isForecastDataLoading || forecast === undefined) return <Box>Vorhersage wird geladen...</Box>

    if (errorOnLoadingForecastData) return <Box>Ein Fehler ist aufgetretten</Box>

    return (
        <Card orientation="vertical" sx={cardContainer}>
            <Box sx={cardHeaderContainer}>
                <Typography level="title-lg" sx={cardHeader}>{temperatureValues.length} Tage Wetter</Typography>
            </Box>
            {errorOnLoadingForecastData ?
                <ErrorComponent message={errorOnLoadingForecastData.toString()}/> :
                <>
                    <Stack direction={"column"} spacing={2}>
                        {temperatureValues.map((entry, index, arr) =>
                            <React.Fragment key={uuid()}>
                                <Box sx={weekListItem}>
                                    <Box>
                                        <Typography sx={cardTitle}>
                                            {entry.day.getDate() === new Date().getDate() ? "Heute" : entry.day.toLocaleDateString("de-DE", {weekday: "long"})}
                                        </Typography>
                                        <Typography noWrap level="body-sm">
                                            {entry.day.toLocaleDateString("de-DE", {day: "2-digit", month: "short", year: "numeric"})}
                                        </Typography>
                                    </Box>
                                    {entry.icon}
                                    <Box sx={minMaxAverageContainer}>
                                        <Typography noWrap level="body-sm">{`${entry.min}${entry.unit}`}</Typography>
                                        <LinearProgress
                                            determinate
                                            value={entry.avg}
                                            size="lg"
                                        />
                                        <Typography noWrap level="body-sm">{`${entry.max}${entry.unit}`}</Typography>
                                    </Box>
                                </Box>
                                {index !== arr.length - 1 ? <Divider /> : null}
                            </React.Fragment>
                        )}
                    </Stack>
                </>
            }
        </Card>
    )
}

const cardContainer: SxProps = {
    display: "grid",
    alignItems: "start",
    alignContent: "start",
    gap: 4,
}
const cardHeaderContainer: SxProps = {
    display: "grid",
    gap: 1.5,
}
const cardHeader: SxProps = {
    justifySelf: "center",
}
const weekSelectionContainer: SxProps = {
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
}
const cardTitle: SxProps = {
    fontSize: 16,
    fontWeight: "600",
}
const weekListItem: SxProps = {
    display: "grid",
    gridTemplateColumns: "minmax(50px, 100px) max-content 1fr",
    gap: 5,
    alignItems: "center",
    alignContent: "center",
}
const minMaxAverageContainer: SxProps = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 0.4,
    alignContent: "center",
    alignItems: "center",
}
const weatherIcon: SxProps = {
    fontSize: {
        lg: "35px",
        xs: "21px",
    },
    justifySelf: "center",
}
export default WeeklyTemperaturesCardComponent
