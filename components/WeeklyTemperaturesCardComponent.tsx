import React, {useMemo, useCallback} from "react";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import {Box, Divider, Stack, useTheme} from "@mui/joy";
import {SxProps} from "@mui/system";
import LinearProgress from "@mui/joy/LinearProgress";
import {v4 as uuid} from "uuid"
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

type Props = {
    forecast: Forecast
}
const WeeklyTemperaturesCardComponent: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    const { forecast } = props;

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
                    style={{ boxShadow: "0 0 5px grey", borderRadius: "8px", backgroundColor: theme.vars.palette.primary["300"] }}
                />,
            }
        }).slice(0, 5)
    }

    const temperatureValues = useMemo(() => resolveDaysFromForecast(), [forecast]);

    return (
        <Card orientation="vertical" sx={cardContainer}>
            <Box sx={cardHeaderContainer}>
                <Typography level="title-lg" sx={cardHeader}>{temperatureValues.length}-Tage-Vorhersage</Typography>
            </Box>
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
        </Card>
    )
}

const cardContainer: SxProps = {
    display: "grid",
    alignItems: "start",
    alignContent: "start",
    borderRadius: "lg",
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
