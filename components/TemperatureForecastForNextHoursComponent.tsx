"use client"
import React, {useEffect, useMemo, useRef, useState} from "react";
import Card from "@mui/joy/Card";
import {Box, Chip, Stack} from "@mui/joy";
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
const TemperatureForecastForNextHoursComponent: React.FC<Props> = (props: Props) => {

    const ref = useRef<HTMLDivElement | null>(null)
    const { weatherList } = props

    const hourlyTemperatures: HourlyTemperature[] = useMemo<HourlyTemperature[]>(() => {
        return weatherList.map(w => {
                return {
                    date: w.dateTime,
                    temp: `${w.temp.toFixed()}°C`,
                    icon: <Image
                        src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                        loader={() => `https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                        width={55}
                        height={55}
                        alt={"weather-indicator"}
                        />,
                }
            })
    }, [props.weatherList])

    return (
        <Card orientation="vertical" ref={ref} sx={cardContainer} data-cy="twenty-four-hours-temperature-wrapper">
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
    overflowX: "auto",
    justifyContent: "stretch"
}
const cardHeader: SxProps = {
    justifySelf: "center",
}
const cardContent: SxProps = {
    display: "flex",
    justifyContent: "space-evenly",
}
const dayContainer: SxProps = {
    display: "grid",
    justifyContent: "center",
    justifyItems: "center",
    px: 2.2,
    borderRadius: 3,
}

export default TemperatureForecastForNextHoursComponent
