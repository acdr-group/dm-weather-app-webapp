"use client"
import React, {useMemo} from "react";
import Card from "@mui/joy/Card";
import {Box, Chip, Stack, useTheme} from "@mui/joy";
import {SxProps} from "@mui/system";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import {Weather} from "@/api/weather";

type HourlyTemperature = {
    date: Date,
    icon: any,
    temp: string,
}

type Props = {
    weatherList: Weather[]
}

/**
 * Component that displays the temperature forecast for the next hours.
 *
 * @component
 * @param {Props} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 */
const TemperatureForecastForNextHoursComponent: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    const { weatherList } = props

    const hourlyTemperatures: HourlyTemperature[] = useMemo<HourlyTemperature[]>(() => {
        return weatherList.map(w => {
                return {
                    date: w.dateTime,
                    temp: `${w.temp.toFixed()}°`,
                    icon: <Image
                        src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                        loader={() => `https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                        width={45}
                        height={45}
                        alt={"weather-indicator"}
                        style={{ boxShadow: "0 0 5px grey", borderRadius: "8px", backgroundColor: theme.vars.palette.primary["300"] }}
                        />,
                }
            })
    }, [props.weatherList])

    return (
        <Card orientation="vertical" sx={cardContainer} data-cy="twenty-four-hours-temperature-wrapper">
            <Typography level="title-lg" sx={cardHeader}>Temperaturen in den nächsten Stunden</Typography>
            <Stack direction="row" sx={cardContent} data-cy="twenty-four-hours-temperature-container">
                {hourlyTemperatures.map((entry, index) =>
                    <Box key={index} sx={dayContainer}>
                        <Typography noWrap>
                            {entry.date.toLocaleString("de-DE", {hour: "2-digit"})}
                        </Typography>
                        <Chip color="primary" variant="solid">
                            {entry.date.toLocaleString("de-DE", {day: "2-digit", month: "2-digit"})}
                        </Chip>
                        {entry.icon}
                        <Typography level="title-md">{entry.temp}</Typography>
                    </Box>
                )}
            </Stack>
        </Card>
    )
}

const cardContainer: SxProps = {
    display: "grid",
    gap: 4,
    justifyContent: "stretch",
    borderRadius: "lg",
    overflowX: "auto",
}
const cardHeader: SxProps = {
    justifySelf: "center",
    textAlign: "center",
}
const cardContent: SxProps = {
    display: "flex",
    justifyContent: "space-around",
}
const dayContainer: SxProps = {
    display: "grid",
    gap: 1,
    justifyContent: "center",
    justifyItems: "center",
    px: 2.2,
    borderRadius: 3,
}
export default TemperatureForecastForNextHoursComponent
