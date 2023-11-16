import React, {forwardRef, useEffect} from 'react';
import {Box} from "@mui/joy";
import {SensorId} from "@/models/sensor";
import {useApplicationContext} from "@/contexts/applicationContext";
import {SensorMeasurement, SensorMeasurementWithTimestamps} from "@/models/sensorMeasurement";
import useFetch from "@/hooks/useFetch";
import {SxProps} from "@mui/system";
import OverviewCardComponent from "@/components/OverviewCardComponent";
import TwentyFourHoursTemperatureComponent from "@/components/TwentyFourHoursTemperatureComponent";
import KeyValueCardListComponent from "@/components/KeyValueCardListComponent";
import WeeklyTemperaturesCardComponent from "@/components/WeeklyTemperaturesCardComponent";
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WifiTetheringOutlinedIcon from "@mui/icons-material/WifiTetheringOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import {KeyValue, ListEntry, TemperaturesForPeriodsOfTheDay} from "@/app/page";
import ErrorComponent from "@/components/shared/ErrorComponent";

type Props = {
    selectedDate: Date
}

const WeatherDataOverviewComponent = forwardRef((props: Props, ref) => {

    const { selectedDate } = props

    const applicationContext = useApplicationContext()

    const readingsRequestOptions = {
        start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 2, 0).toISOString(),
        end: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 25, 0).toISOString(),
        stations: process.env.NEXT_PUBLIC_DM_TECH_STATION_ID!,
        sensors: `
            ${SensorId.AIR_TEMPERATURE},
            ${SensorId.WIND_SPEED},
            ${SensorId.WIND_DIRECTION},
            ${SensorId.PRECIPITATION_AMOUNT},
            ${SensorId.AIR_HUMIDITY},
            ${SensorId.AIR_PRESSURE}
        `,
    }

    const {
        data,
        isLoading,
        error,
        reFetch,
    } = useFetch<SensorMeasurementWithTimestamps>(applicationContext.getReadings(readingsRequestOptions))

    useEffect(() => {
        reFetch()
    }, [props.selectedDate])

    const getWeatherKeyValue = (sensorId: SensorId): SensorMeasurement => {
        return data?.sensorMeasurements.find(m => m.id === sensorId)!
    }

    const getOverviewValues = (getWeatherKeyValueBySensorId: (sensorId: SensorId) => SensorMeasurement): ListEntry[] => {
        return [
            {
                icon: <CompressOutlinedIcon/>,
                value: getWeatherKeyValueBySensorId(SensorId.AIR_PRESSURE).avg,
                unit: getWeatherKeyValueBySensorId(SensorId.AIR_PRESSURE).unit,
            },
            {
                icon: <WaterDropOutlinedIcon/>,
                value: getWeatherKeyValueBySensorId(SensorId.AIR_HUMIDITY).avg,
                unit: getWeatherKeyValueBySensorId(SensorId.AIR_HUMIDITY).unit,
            },
            {
                icon: <AirOutlinedIcon/>,
                value: getWeatherKeyValueBySensorId(SensorId.WIND_SPEED).avg,
                unit: getWeatherKeyValueBySensorId(SensorId.WIND_SPEED).unit,
            },
        ]
    }

    const getTemperatureInAnHour = (hour: number, timeStamps: string[], values: number[]): number => {
        const timeStampFound = timeStamps
            .filter(t => new Date(t).getHours() === hour)
            .filter(t => new Date(t).getMinutes() === 0)[0]

        const timeStampIndex = timeStamps.indexOf(timeStampFound)

        return values[timeStampIndex]
    }

    const getTemperaturesForPeriodsOfTheDay = (
        getWeatherKeyValueBySensorId: (sensorId: SensorId) => SensorMeasurement,
        timeStamps: string[],
    ): TemperaturesForPeriodsOfTheDay[] => {

        return [
            {
                dayPeriod: "Morgen",
                value: getTemperatureInAnHour(9, timeStamps, getWeatherKeyValueBySensorId(SensorId.AIR_TEMPERATURE).values),
                unit: getWeatherKeyValueBySensorId(SensorId.AIR_TEMPERATURE).unit,
            },
            {
                dayPeriod: "Nachmittags",
                value: getTemperatureInAnHour(15, timeStamps, getWeatherKeyValueBySensorId(SensorId.AIR_TEMPERATURE).values),
                unit: getWeatherKeyValueBySensorId(SensorId.AIR_TEMPERATURE).unit,
            },
            {
                dayPeriod: "Abend",
                value: getTemperatureInAnHour(19, timeStamps, getWeatherKeyValueBySensorId(SensorId.AIR_TEMPERATURE).values),
                unit: getWeatherKeyValueBySensorId(SensorId.AIR_TEMPERATURE).unit,
            },
            {
                dayPeriod: "Nacht",
                value: getTemperatureInAnHour(22, timeStamps, getWeatherKeyValueBySensorId(SensorId.AIR_TEMPERATURE).values),
                unit: getWeatherKeyValueBySensorId(SensorId.AIR_TEMPERATURE).unit,
            },
        ]
    }

    const getKeyValues = (getWeatherKeyValueBySensorId: (sensorId: SensorId) => SensorMeasurement): KeyValue[] => {
        return [
            {
                title: "Windgeschwindigkeit",
                value: getWeatherKeyValueBySensorId(SensorId.WIND_SPEED).avg,
                unit: getWeatherKeyValueBySensorId(SensorId.WIND_SPEED).unit,
                icon: <WifiTetheringOutlinedIcon/>,
            },
            {
                title: "Windrichtung",
                value: getWeatherKeyValueBySensorId(SensorId.WIND_DIRECTION).avg,
                unit: getWeatherKeyValueBySensorId(SensorId.WIND_DIRECTION).unit,
                icon: <WifiTetheringOutlinedIcon/>,
            },
            {
                title: "Niederschlag",
                value: getWeatherKeyValueBySensorId(SensorId.PRECIPITATION_AMOUNT).avg,
                unit: getWeatherKeyValueBySensorId(SensorId.PRECIPITATION_AMOUNT).unit,
                icon: <WaterDropOutlinedIcon/>,
            },
            {
                title: "Feuchtigkeit",
                value: getWeatherKeyValueBySensorId(SensorId.AIR_HUMIDITY).avg,
                unit: getWeatherKeyValueBySensorId(SensorId.AIR_HUMIDITY).unit,
                icon: <OpacityOutlinedIcon/>,
            },
            {
                title: "Luftdruck",
                value: getWeatherKeyValueBySensorId(SensorId.AIR_PRESSURE).avg,
                unit: getWeatherKeyValueBySensorId(SensorId.AIR_PRESSURE).unit,
                icon: <CompressOutlinedIcon/>,
            },
        ]
    }

    if (data === undefined || isLoading) return <Box>Loading data...</Box>

    if (error) return <ErrorComponent message={error.toString()}/>

    return (
        <Box ref={ref}>
            <Box sx={overviewWrapper}>
                <Box sx={overviewCardAndFilterContainer}>
                    <OverviewCardComponent
                        measurementDate={props.selectedDate.toLocaleDateString()}
                        overviewValues={getOverviewValues(getWeatherKeyValue)}
                        averageDayTemperatureAndUnit={`${getWeatherKeyValue(SensorId.AIR_TEMPERATURE).avg}${getWeatherKeyValue(SensorId.AIR_TEMPERATURE).unit}`}
                        temperaturesForPeriodsOfTheDay={getTemperaturesForPeriodsOfTheDay(getWeatherKeyValue, data.time)}
                    />
                    <TwentyFourHoursTemperatureComponent
                        hours={data.time}
                        values={getWeatherKeyValue(SensorId.AIR_TEMPERATURE).values}
                    />
                    <KeyValueCardListComponent keyValues={getKeyValues(getWeatherKeyValue)}/>
                </Box>
                <WeeklyTemperaturesCardComponent/>
            </Box>
        </Box>
    )
})

const overviewWrapper: SxProps = {
    display: "grid",
    gridTemplateColumns: {
        lg: "5fr 2fr",
        md: "1fr",
        xs: "1fr",
    },
    gap: 3,
}
const overviewCardAndFilterContainer: SxProps = {
    display: "grid",
    gap: 3,
}

export default WeatherDataOverviewComponent
