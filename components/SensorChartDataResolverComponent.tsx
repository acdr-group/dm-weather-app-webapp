import React, { useMemo, useEffect } from 'react';
import {filterByDistinctDate, useApplicationContext} from "@/contexts/applicationContext";
import {SensorMeasurement, SensorMeasurementWithTimestamps} from "@/models/sensorMeasurement";
import {ReadingsQueryParams} from "@/api/reading";
import useFetch from "@/hooks/useFetch";
import {Box} from "@mui/joy";
import ErrorComponent from "@/components/shared/ErrorComponent";
import {ChartDataSeType} from "@/components/ChartComponent";
import {mapTimeLabelToValues} from "@/contexts/applicationContext";
import {SensorId} from "@/models/sensor";

type Props = {
    startDate: Date,
    endDate: Date,
    station: string,
    sensor: SensorId,
    children: (chartDataSet: ChartDataSeType[], sensorMeasuremnt: SensorMeasurement) => React.ReactNode
}

const SensorChartDataResolverComponent: React.FC<Props> = (props: Props) => {

    const applicationContext = useApplicationContext()

    const {
        startDate,
        endDate,
        station,
        sensor
    } = props

    const readingsRequestOptions: ReadingsQueryParams = {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        stations: station,
        sensors: sensor as unknown as string,
    }

    const {
        data,
        isLoading,
        error,
        reFetch
    } = useFetch<SensorMeasurementWithTimestamps>(applicationContext.getReadings(readingsRequestOptions))

    useEffect(() => {
        reFetch()
    }, [props])

    const chartData = useMemo<ChartDataSeType[] | undefined>(() => {
        if (data === undefined) return undefined
        const timeStampAndValueMapped = mapTimeLabelToValues(data.time, data.sensorMeasurements[0].values)

        return filterByDistinctDate(timeStampAndValueMapped).map(d => {
            return {
                y: d.value ?? 0,
                x: d.date.toLocaleString([], {day: "2-digit", month: "short", year: "2-digit"}),
            }
        })
    }, [data])

    if (isLoading || data === undefined) return <Box>Loading...</Box>

    if (error) return <ErrorComponent message={error.toString()} />

    return (
        <>
            {chartData && props.children(chartData, data.sensorMeasurements[0])}
        </>
    )
}

export default SensorChartDataResolverComponent
