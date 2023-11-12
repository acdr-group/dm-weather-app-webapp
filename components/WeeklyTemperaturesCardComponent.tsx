import React, {useEffect, useState} from 'react';
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import {Box, Divider, Stack} from "@mui/joy";
import {SxProps} from "@mui/system";
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import LinearProgress from "@mui/joy/LinearProgress";
import {START_DATE_STAMP_OF_BACKWARDS_DELIVERY_OF_DATA, useApplicationContext} from "@/contexts/applicationContext";
import {SensorId} from "@/models/sensor";
import ErrorComponent from "@/components/shared/ErrorComponent";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

type TemperatureValuesOfADay = {
    day: Date
    min: number
    max: number
    avg: number
    unit: string
    icon: any
}

type Props = {}

const WeeklyTemperaturesCardComponent: React.FC<Props> = (props: Props) => {

    const applicationContext = useApplicationContext()
    const referenceDate = new Date(START_DATE_STAMP_OF_BACKWARDS_DELIVERY_OF_DATA)
    const [startDate, setStartDate] = useState<Date>(new Date(referenceDate))
    const [endDate, setEndDate] = useState<Date>(new Date(referenceDate.setDate(startDate.getDate() + 7)))

    const [sevenDaysTemperatureValues, setSevenDaysTemperatureValues] = useState<TemperatureValuesOfADay[] | undefined>(undefined)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        if (startDate === undefined && endDate === undefined) return
        loadSevenDaysTemperatureValues().then(data => setSevenDaysTemperatureValues(data))
    }, [endDate])

    const loadSevenDaysTemperatureValues = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const temperatureValuesResponse = await Promise.all(
                getDaysBetweenStartAndEndDates().map(day => {
                    console.log("Date for request: ", day.toISOString())
                    const readingsRequestOptions = {
                        start: day.toISOString(),
                        end: day.toISOString(),
                        stations: process.env.NEXT_PUBLIC_DM_TECH_STATION_ID!,
                        sensors: `${SensorId.AIR_TEMPERATURE}`,
                    }
                    return applicationContext.getReadings(readingsRequestOptions)
                })
            )

            return temperatureValuesResponse
                .map(t => t.data)
                .map(t => {
                    const sensorMeasurement = t.sensorMeasurements[0]
                    return {
                        day: new Date(t.time[0]),
                        min: sensorMeasurement.min,
                        max: sensorMeasurement.max,
                        avg: sensorMeasurement.avg,
                        unit: sensorMeasurement.unit,
                        icon: <CloudOutlinedIcon sx={weatherIcon}/>,
                    }
                })

        } catch (err) {
            setError(err)
            console.error("An Error occurred when loading the seven day forcast. ", err)
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString()
    }

    const incrementWeek = () => {
        setStartDate(endDate)
        const newEndDate = new Date(endDate)

        if (newEndDate > endDate) return
        setEndDate(new Date(newEndDate.setDate(newEndDate.getDate() + 7)))
    }

    const decrementWeek = () => {
        setEndDate(startDate)
        const newStartDate = new Date(startDate)
        setStartDate(new Date(newStartDate.setDate(newStartDate.getDate() - 7)))
    }

    const getDaysBetweenStartAndEndDates = () => {
        const days = []
        let currentDate = new Date(startDate)

        while (currentDate < endDate) {
            days.push(new Date(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }
        return days
    }

    return (
        <Card orientation="vertical" sx={cardContainer}>
            <Box sx={cardHeaderContainer}>
                <Typography level="title-lg" sx={cardHeader}>7 Tage Wetter</Typography>
                <Stack direction={"row"} sx={weekSelectionContainer}>
                    <IconButton onClick={decrementWeek}>
                        <ArrowBackIosOutlinedIcon/>
                    </IconButton>
                    <Typography sx={cardTitle}>
                        {`${formatDate(startDate)} - ${formatDate(endDate)}`}
                    </Typography>
                    <IconButton onClick={incrementWeek}>
                        <ArrowForwardIosOutlinedIcon/>
                    </IconButton>
                </Stack>
            </Box>
            {error ?
                <ErrorComponent message={error.toString()}/> :
                <>
                    <Stack direction={"column"} spacing={3}>
                        {sevenDaysTemperatureValues?.map((entry, index, arr) => {
                                console.log("Entry value: ", entry)
                                return (
                                    <>
                                        <Box key={index} sx={weekListItem}>
                                            <Box>
                                                <Typography sx={cardTitle}>{entry.day.toLocaleDateString([], {weekday: "long"})}</Typography>
                                                <Typography noWrap level="body-sm">{entry.day.toLocaleDateString([], {day: "2-digit", month: "short", year: "numeric"})}</Typography>
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
                                        {index !== arr.length - 1 ? <Divider/> : null}
                                    </>
                                )
                            }
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
    gap: 6,
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
    display: "flex",
    gap: 3,
    justifyContent: "space-between",
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
    }
}
export default WeeklyTemperaturesCardComponent
