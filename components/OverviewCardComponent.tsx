import React from 'react';
import {Box} from "@mui/joy";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import LinearProgress from "@mui/joy/LinearProgress";
import {SxProps} from "@mui/system";
import {ListEntry, TemperaturesForPeriodsOfTheDay} from "@/app/page";

type Props = {
    measurementDate: string
    overviewValues: ListEntry[]
    averageDayTemperatureAndUnit: string
    temperaturesForPeriodsOfTheDay: TemperaturesForPeriodsOfTheDay[]
}
const OverviewCardComponent: React.FC<Props> = (props: Props) => {
    return (
        <Card
            //invertedColors
            //variant="soft"
            orientation="horizontal"
            sx={overviewCardContainer}
        >
            <Box sx={overviewCardDataColumn}>
                <Box sx={locationAndDateContainer}>
                    <Box sx={iconAndCityContainer}>
                        <LocationOnOutlinedIcon/>
                        <Box sx={cardTitle}>Karlsruhe dmTECH</Box>
                    </Box>
                    <Box sx={measurementDate}>{new Date(props.measurementDate).toLocaleDateString([], {day: "2-digit", month: "short", year: "2-digit"})}</Box>
                </Box>
                <Box sx={overviewTemperatureValueContainer}>
                    <Box sx={temperatureValue}>{props.averageDayTemperatureAndUnit}</Box>
                    <Box></Box>
                </Box>
                <Box sx={overviewValuesContainer}>
                    {props.overviewValues.map(entry =>
                        <Box key={entry.value} sx={overviewValueItem}>
                            <Box>{entry.icon}</Box>
                            <Box>{`${entry.value}${entry.unit}`}</Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <Card orientation="vertical">
                <Typography sx={cardTitle}>Temperaturverlauf</Typography>
                <Box sx={temperatureProgressListContainer}>
                    {props.temperaturesForPeriodsOfTheDay.map((entry) =>
                        <Box key={entry.dayPeriod}>
                            <Typography>{`${entry.dayPeriod}`}</Typography>
                            <LinearProgress
                                determinate
                                value={entry.value}
                                sx={linearProgress}
                            >
                                <Typography
                                    level="body-xs"
                                    textColor="common.white"
                                    sx={linearProgressContent}
                                >
                                    {`${entry.value}${entry.unit}`}
                                </Typography>
                            </LinearProgress>
                        </Box>
                    )}
                </Box>
            </Card>
        </Card>
    )
}

const overviewCardContainer: SxProps = {
    display: "grid",
    gridTemplateColumns: {
        lg: "1fr 1fr",
        xs: "1fr",
    },
    gap: 5,
    borderRadius: 'sm',
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
}
const temperatureValue: SxProps = {
    fontSize: 65,
}
const overviewValuesContainer: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    gap: 3,
}
const linearProgress: SxProps = {
    '--LinearProgress-radius': '10px',
    '--LinearProgress-thickness': '15px',
}
const linearProgressContent: SxProps = {
    mixBlendMode: 'difference',
}

export default OverviewCardComponent
