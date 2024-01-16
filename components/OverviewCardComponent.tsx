import React from "react";
import {Box, Theme} from "@mui/joy";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import LinearProgress from "@mui/joy/LinearProgress";
import {SxProps} from "@mui/system";
import {ListEntry, TemperaturesForPeriodsOfTheDay} from "@/app/page";

type Props = {
    description: string
    measurementDate: Date
    overviewWeatherValues: ListEntry[]
    currentTemperatureAndUnit: string
    temperaturesForPeriodsOfTheDay: TemperaturesForPeriodsOfTheDay[]
}

/**
 * Represents an overview card component.
 * @function OverviewCardComponent
 * @param {Object} props - The props object containing data for the component.
 * @returns {React.Component} - The rendered OverviewCardComponent.
 */
const OverviewCardComponent: React.FC<Props> = (props: Props) => {
    return (
        <Card
            orientation="horizontal"
            sx={overviewCardContainer}
        >
            <Box sx={overviewCardDataColumn}>
                <Box sx={locationAndDateContainer}>
                    <Box sx={iconAndCityContainer}>
                        <LocationOnOutlinedIcon/>
                        <Box sx={cardTitle}>Karlsruhe dmTECH</Box>
                    </Box>
                    <Box sx={measurementDate}>
                        {props.measurementDate
                            .toLocaleDateString("de-DE", {day: "2-digit", month: "short", year: "2-digit"})
                        }
                    </Box>
                </Box>
                <Box sx={overviewTemperatureValueContainer}>
                    <Typography sx={temperatureValue}>{props.currentTemperatureAndUnit}</Typography>
                    <Typography level="title-lg" sx={{ fontSize: 25 }}>{props.description}</Typography>
                </Box>
                <Box sx={overviewValuesContainer}>
                    {props.overviewWeatherValues.map((entry, index) =>
                        <Box key={index} sx={overviewValueItem}>
                            <Box>{entry.icon}</Box>
                            <Box>{`${entry.value}${entry.unit}`}</Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Card>
    )
}

const overviewCardContainer: SxProps = {
    display: "grid",
    borderRadius: "lg",
}
const overviewCardDataColumn: SxProps = {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gap: 3,
    py: 0.8,
    px: 2,
    "@media screen and (max-width: 900px)": {
        px: 1,
    },
}
const locationAndDateContainer: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    gap: 4,
}
const iconAndCityContainer: SxProps = {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    gap: 0.8,
}
const measurementDate: SxProps = {}
const cardTitle: SxProps = {
    fontSize: 16,
    fontWeight: "600",
}
const overviewValueItem: SxProps = {
    display: "grid",
    justifyContent: "center",
    justifyItems: "center",
}
const overviewTemperatureValueContainer: SxProps = {
    display: "grid",
    justifyContent: "center",
    justifyItems: "center",
    alignSelf: "center",
    textAlign: "center",
}
const temperatureValue: SxProps = {
    fontSize: 85,
}
const overviewValuesContainer: SxProps = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 7,
}
const linearProgress: SxProps = {
    "--LinearProgress-radius": "10px",
    "--LinearProgress-thickness": "15px",
}
const linearProgressContent: SxProps = {
    mixBlendMode: "difference",
}

export default OverviewCardComponent
