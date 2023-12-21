"use client"
import React, {useEffect, useMemo, useRef, useState} from "react";
import Card from "@mui/joy/Card";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import {Box, Stack} from "@mui/joy";
import {SxProps} from "@mui/system";
import Typography from "@mui/joy/Typography";
import {mapTimeLabelToValues} from "@/contexts/applicationContext";

type HourlyTemperature = {
    date: Date,
    icon: any,
    temp: string,
}

type Props = {
    hours: string[]
    values: number[]
}
const TwentyFourHoursTemperatureComponent: React.FC<Props> = (props: Props) => {

    const ref = useRef<HTMLDivElement | null>(null)
    const [containerWidth, setWidth] = useState(100 + "%");
    const [animationState, setPlay] = useState("paused");
    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.scrollWidth + "px");
            setPlay("running");
        }
    }, [])

    const hourlyTemperatures: HourlyTemperature[] = useMemo<HourlyTemperature[]>(() => {
        return mapTimeLabelToValues(props.hours, props.values)
            .map(d => {
                return {
                    date: d.date,
                    icon: <CloudOutlinedIcon/>,
                    temp: `${d.value?.toFixed(0)}°C`,
                }
            })
    }, [props.hours, props.values])

    return (
        <Card orientation="horizontal" ref={ref} sx={cardContainer}data-cy="twenty-four-hours-temperature-wrapper">
            <Stack direction="row" sx={cardContent} data-cy="twenty-four-hours-temperature-container">
                {hourlyTemperatures.map((entry, index) =>
                    <Box key={index} sx={dayContainer}>
                        <Typography noWrap>
                            {entry.date.toLocaleString([], {hour: "2-digit"})}
                        </Typography>
                        {entry.icon}
                        <Typography level="title-md">{entry.temp}</Typography>
                    </Box>
                )}
            </Stack>
        </Card>
    )
}

const cardContainer: SxProps = {
    display: "flex",
    overflowX: "auto",
}
const cardContent: SxProps = {
    //overflowX: "auto",
    //overflow: "hidden",
    display: "flex",
    "@keyframes swipe": {
        "0%": {
            transform: "translate(0)",
            opacity: 0.9,
        },
        "100%": {
            transform: "translate(-100%)",
            opacity: 1,
        },
    },
    //animation: "swipe 10s linear infinite backwards",
}
const dayContainer: SxProps = {
    display: "grid",
    justifyContent: "center",
    justifyItems: "center",
    px: 2.2,
    borderRadius: 3,
}

export default TwentyFourHoursTemperatureComponent
