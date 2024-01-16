"use client"
import React, {useCallback, useMemo, useState} from "react"
import PageLayoutComponent from "@/components/shared/PageLayoutComponent"
import {Box, FormControl, FormLabel} from "@mui/joy"
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {SxProps} from "@mui/system";
import ChartComponent, {ChartDataSetType} from "@/components/ChartComponent";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import useFetch from "@/hooks/useFetch";
import {Forecast} from "@/api/forecast";
import {useApplicationContext} from "@/contexts/applicationContext";
import {useFullScreen} from "@/hooks/useFullScreen";
import {Weather} from "@/api/weather";
import LoadingComponent from "@/components/shared/LoadingComponent";
import ErrorComponent from "@/components/shared/ErrorComponent";

enum Sensor {
    Temperatur = "Temperatur",
    Luftdruck = "Luftdruck",
    Luftfeuchtigkeit = "Luftfeuchtigkeit",
}

/**
 * Represents the Analysis page component.
 *
 * @typedef {React.FC} AnalysisPage
 * @returns {ReactNode} The rendered AnalysisPage component.
 */
const AnalysisPage: React.FC = () => {
    const applicationContext = useApplicationContext()

    const [selectedSensor, setSelectedSensor] = useState<Sensor>(Sensor.Temperatur);

    const { isFullScreen } = useFullScreen()

    const {
        data: forecast,
        isLoading,
        error,
    } = useFetch<Forecast>(applicationContext.getForecast())

    const resolveAttributNameOnWeatherObjectFromSensorName = (): string => {
        switch (selectedSensor) {
            case Sensor.Temperatur: return "temp";
            case Sensor.Luftdruck: return "pressure";
            case Sensor.Luftfeuchtigkeit: return "humidity";
            default: return "temp";
        }
    }

    const resolveUnitFromSensorName  = (): string => {
        switch (selectedSensor) {
            case Sensor.Temperatur: return "°C";
            case Sensor.Luftdruck: return "hPa";
            case Sensor.Luftfeuchtigkeit: return "%";
            default: return "°C";
        }
    }

    const handleSensorChange = (value: Sensor) => {
        setSelectedSensor(value)
    }

    const resolveChartData = useCallback((): ChartDataSetType[] => {
        const propertyName = resolveAttributNameOnWeatherObjectFromSensorName()
        return forecast === undefined ? [] : forecast.weatherList.map(w => {
            return {
                x: w.dateTime.toLocaleDateString("de-DE", {day: "2-digit", month: "short", year: "2-digit"}),
                // @ts-ignore
                y: w[propertyName]
            }
        })
    }, [forecast, selectedSensor])

    const extractDatesFromWeatherList = useCallback((): Weather[] => {
        return forecast?.weatherList.reduce((acc: Weather[], curr: Weather) =>
                (acc as Weather[])
                    .find(w => w.dateTime.getDate() === curr.dateTime.getDate()) ?
                    acc : [...acc, curr]
            , [])
    }, [forecast]);

    const sensorValues = useMemo(() => extractDatesFromWeatherList(), [forecast]);

    return (
        <PageLayoutComponent title={isFullScreen ? undefined : "Analysen"}>
            {
                isLoading ? <LoadingComponent message={"Analysendaten werden geladen..."} /> :
                    error ? <ErrorComponent message={error.toString()}/> :
                        <>
                            <Box sx={filtersContainer}>
                                <FormControl size="sm" sx={sensorInput}>
                                    <FormLabel>Sensor</FormLabel>
                                    <Select
                                        defaultValue={selectedSensor}
                                        value={selectedSensor}
                                        onChange={(_, value) => handleSensorChange(value!)}
                                        slotProps={{
                                            listbox: {
                                                variant: "outlined",
                                            },
                                        }}
                                        data-cy="sensor-dropdown"
                                        sx={sensorDropdown}
                                    >
                                        {Object.values(Sensor).map(sensor =>
                                            <Option key={sensor} value={sensor}>
                                                {sensor}
                                            </Option>
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Card sx={{
                                display: "flex",
                                width: "100%",
                                height: "420px",
                                minheight: "420px",
                                borderRadius: "lg",
                                py: 4,
                            }}>
                                <Box component="div">
                                    <Typography level={"title-lg"}>
                                        {selectedSensor} in den nächten {sensorValues.length} Tagen
                                    </Typography>
                                    <Typography level={"title-md"}>Einheit in {resolveUnitFromSensorName()}</Typography>
                                </Box>
                                <ChartComponent
                                    dataSet={resolveChartData()}
                                    horizontalAxisLabel={"Zeitspanne"}
                                    verticalAxisLabel={selectedSensor}
                                    chartTitle={selectedSensor}
                                    unit={resolveUnitFromSensorName()}
                                />
                            </Card>
                        </>
            }
        </PageLayoutComponent>
    )
}

const dateInput: SxProps = {
    width: {
        lg: "250px",
        xs: "100%",
    },
    justifySelf: "start",
}
const sensorInput: SxProps = {
    ...dateInput,
    flex: 1,
    height: "100%",
}
const filtersContainer: SxProps = {
    display: "flex",
    flexDirection: {
        lg: "row",
        md: "column",
        xs: "column",
    },
    alignContent: "stretch",
    alignItems: "stretch",
    gap: 2,
}
const sensorDropdown: SxProps = {
    "&:hover": {
        backgroundColor: "transparent",
    },
}
export default AnalysisPage
