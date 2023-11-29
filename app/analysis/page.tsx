"use client"
import React, {useState} from 'react'
import PageLayoutComponent from "@/components/shared/PageLayoutComponent"
import {Box, FormControl, FormLabel, Input} from "@mui/joy"
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {getMaxMinAndAvg} from "@/contexts/applicationContext";
import {SxProps} from "@mui/system";
import {SensorId, SensorName} from "@/models/sensor";
import ChartComponent from "@/components/ChartComponent";
import SensorChartDataResolverComponent from "@/components/SensorChartDataResolverComponent";
import Card from "@mui/joy/Card";
import {SensorMeasurement} from "@/models/sensorMeasurement";
import {KeyValue} from "@/app/page";
import KeyValueCardListComponent from "@/components/KeyValueCardListComponent";
import Typography from "@mui/joy/Typography";

type SensorMappedWithIdAndName = {
    id: SensorId,
    name: SensorName,
}

const mappedSensorIdWithNameList = [
    {id: SensorId.AIR_TEMPERATURE, name: SensorName.AIR_TEMPERATURE},
    {id: SensorId.AIR_HUMIDITY, name: SensorName.AIR_HUMIDITY},
    {id: SensorId.PRECIPITATION_AMOUNT, name: SensorName.PRECIPITATION_AMOUNT},
    {id: SensorId.WIND_SPEED, name: SensorName.WIND_SPEED},
    {id: SensorId.WIND_DIRECTION, name: SensorName.WIND_DIRECTION},
    {id: SensorId.AIR_PRESSURE, name: SensorName.AIR_PRESSURE},
]

type Props = {}

const AnalysisPage: React.FC<Props> = (props: Props) => {

    const [startDate, setStartDate] = useState<string>("2022-09-01T00:00")
    const [endDate, setEndDate]= useState<string>("2022-09-20T00:00")
    const [selectedSensor, setSelectedSensor] = useState<SensorMappedWithIdAndName>(mappedSensorIdWithNameList[0])

    const getKeyValues = (values: number[], sensorMeasurement: SensorMeasurement): KeyValue[] => {

        const {
            min,
            max,
            avg,
        } = getMaxMinAndAvg(values)

        return [
            {
                title: 'Höchster Wert',
                description: "Lorem ipsum dolor sit amet kvkldn dfjbnfdbnd djhvdlifidwb",
                value: max ?? 0,
                icon: <div>TODO</div>,
                unit: sensorMeasurement.unit,
            },
            {
                title: 'Niedrigster Wert',
                description: "Lorem ipsum dolor sit amet kvkldn dfjbnfdbnd djhvdlifidwb",
                value: min ?? 0,
                icon: <div>TODO</div>,
                unit: sensorMeasurement.unit,
            },
            {
                title: 'Durchschnittlicher Wert',
                description: "Lorem ipsum dolor sit amet kvkldn dfjbnfdbnd djhvdlifidwb",
                value: avg ?? 0,
                icon: <div>TODO</div>,
                unit: sensorMeasurement.unit,
            },
        ]
    }

    const getChartName = (sensorId: SensorId): SensorName => {
        switch (sensorId) {
            case SensorId.AIR_TEMPERATURE: return SensorName.AIR_TEMPERATURE
            case SensorId.AIR_HUMIDITY: return SensorName.AIR_HUMIDITY
            case SensorId.PRECIPITATION_AMOUNT: return SensorName.PRECIPITATION_AMOUNT
            case SensorId.WIND_SPEED: return SensorName.WIND_SPEED
            case SensorId.WIND_DIRECTION: return SensorName.WIND_DIRECTION
            case SensorId.AIR_PRESSURE: return SensorName.AIR_PRESSURE
            default: return SensorName.AIR_TEMPERATURE
        }
    }

    const handleSensorChange = (value: SensorName) => {
        const foundSensor = mappedSensorIdWithNameList.find(s => s.name === value)
        if (foundSensor === undefined) return
        setSelectedSensor(foundSensor)
    }

    return (
        <PageLayoutComponent title={"Analysen"}>
            <Box sx={filtersContainer}>
                <FormControl size="sm" sx={sensorInput}>
                    <FormLabel>Sensor</FormLabel>
                    <Select
                        defaultValue={selectedSensor.name}
                        value={selectedSensor.name}
                        onChange={(_, value) => handleSensorChange(value!)}
                        slotProps={{
                            listbox: {
                                variant: 'outlined',
                            },
                        }}
                        data-cy="sensor-dropdown"
                        sx={sensorDropdown}
                    >
                        {mappedSensorIdWithNameList.map(sensor =>
                            <Option key={sensor.id} value={sensor.name}>
                                {sensor.name}
                            </Option>
                        )}
                    </Select>
                </FormControl>
                <FormControl size="sm" sx={dateInput}>
                    <FormLabel>Ab</FormLabel>
                    <Input
                        type="date"
                        defaultValue={new Date(startDate).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
                        size="md"
                        slotProps={{
                            input: {
                                placeholder: "Datum auswählen",
                            }
                        }}
                        onChange={(e) => setStartDate(new Date(e.target.value).toISOString())}
                    />
                </FormControl>
                <FormControl size="sm" sx={dateInput}>
                    <FormLabel>Bis</FormLabel>
                    <Input
                        type="date"
                        defaultValue={new Date(endDate).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
                        placeholder="Datum auswählen"
                        size="md"
                        onChange={(e) => setEndDate(new Date(e.target.value).toISOString())}
                    />
                </FormControl>
            </Box>
            <SensorChartDataResolverComponent
                startDate={new Date(startDate)}
                endDate={new Date(endDate)}
                station={process.env.NEXT_PUBLIC_DM_TECH_STATION_ID!}
                sensor={selectedSensor.id}
            >
                {(chartDataSet, sensorMeasuremnt) =>
                    <>
                        <Card sx={{
                            display: "flex",
                            width: {
                                lg: "1520px",
                                md: "100%",
                                xs: "100%",
                            },
                            height: "420px",
                        }}>
                            <Box component="div">
                                <Typography level={"title-lg"}>
                                    {getChartName(sensorMeasuremnt.id as unknown as SensorId)}
                                </Typography>
                                <Typography level={"title-md"}>Einheit in {sensorMeasuremnt.unit}</Typography>
                            </Box>
                            <ChartComponent
                                dataSet={chartDataSet}
                                horizontalAxisLabel={"Zeitspanne"}
                                verticalAxisLabel={getChartName(sensorMeasuremnt.id as unknown as SensorId)}
                                chartTitle={getChartName(sensorMeasuremnt.id as unknown as SensorId)}
                                unit={sensorMeasuremnt.unit}
                            />
                        </Card>
                        <KeyValueCardListComponent
                            keyValues={getKeyValues(chartDataSet.map(c => c.y), sensorMeasuremnt)}
                        />
                    </>
                }
            </SensorChartDataResolverComponent>
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
    '&:hover': {
        bgcolor: 'transparent',
    },
}
export default AnalysisPage
