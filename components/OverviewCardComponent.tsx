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
                            .toLocaleDateString("de-DE", {day: "2-digit", month: "short", year: "numeric"})
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
    gridTemplateColumns: "1fr",
    gap: 5,
    borderRadius: "sm",
}
const overviewCardDataColumn: SxProps = {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gap: 8,
    py: 0.8,
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
const temperatureProgressListContainer: SxProps = {
    display: "grid",
    gap: 1,
}
const overviewValueItem: SxProps = {
    display: "flex",
    gap: 0.8,
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
