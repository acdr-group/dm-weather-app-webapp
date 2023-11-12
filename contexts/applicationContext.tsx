"use client"
import {Station} from "@/models/station";
import {Sensor, SensorListResponse} from "@/models/sensor";
import {SensorMeasurementWithTimestamps} from "@/models/sensorMeasurement";
import {getReadingsApi, ReadingsQueryParams} from "@/api/reading";
import React, {createContext, PropsWithChildren, useContext} from "react";
import {AxiosResponse} from "axios";
import {getStationByIdApi} from "@/api/station";
import {getSensorOfStationBySensorIdApi, getSensorsOfStationApi} from "@/api/sensor";

type ContextOutput = {
    getStationById: (id: number) => Promise<AxiosResponse<Station, any>>
    getSensorsOfStation: (stationId: number) => Promise<AxiosResponse<Sensor, any>>
    getSensorOfStationBySensorId: (stationId: number, sensorId: number) => Promise<AxiosResponse<SensorListResponse, any>>
    getReadings: (queryParams: ReadingsQueryParams) => Promise<AxiosResponse<SensorMeasurementWithTimestamps, any>>
}

// @ts-ignore
const ApplicationContext = createContext<ContextOutput>({})

export const useApplicationContext = (): ContextOutput => {
    return useContext(ApplicationContext)
}

export const START_DATE_STAMP_OF_BACKWARDS_DELIVERY_OF_DATA = "2022-09-01T00:00:00Z"

type PropsApplicationContext = PropsWithChildren & {}

export const ApplicationContextProvider: React.FC<PropsApplicationContext> = (props: PropsApplicationContext) => {

    const getStationById = async (id: number): Promise<AxiosResponse<Station, any>> => {
        return await getStationByIdApi(id)
    }

    const getSensorsOfStation = async (stationId: number): Promise<AxiosResponse<Sensor, any>> => {
        return await getSensorsOfStationApi(stationId)
    }

    const getSensorOfStationBySensorId = async (stationId: number, sensorId: number): Promise<AxiosResponse<SensorListResponse, any>> => {
        return await getSensorOfStationBySensorIdApi(stationId, sensorId)
    }

    const getReadings = async (queryParams: ReadingsQueryParams): Promise<AxiosResponse<SensorMeasurementWithTimestamps, any>> => {
        return await getReadingsApi(queryParams)
    }

    return (
        <ApplicationContext.Provider value={{
            getStationById: getStationById,
            getSensorsOfStation: getSensorsOfStation,
            getSensorOfStationBySensorId: getSensorOfStationBySensorId,
            getReadings: getReadings,
        }}>
            {props.children}
        </ApplicationContext.Provider>
    )
}

type DataValueMap = {
    date: Date
    value: number
}
export const mapTimeLabelToValues = (time: string[], values: number[]): DataValueMap[] => {
    const dates = time.map(t => new Date(t))
    return dates
        .map((d, i) => {
            return {
                date: d,
                value: values[i]
            }
        })
        // TODO: To filter data out and get dates with starting at 0 minutes. Do we really need this ?
        // TODO: Extract this to into a new function
        .filter(d => d.date.getMinutes() === 0)
    //.slice(0, 12)
}

export const filterByDistinctDate = (entries: DataValueMap[]): DataValueMap[] => {
    return entries
        .reduce((acc: {date: Date, value: number}[], curr: {date: Date, value: number}) =>
                acc.find(e =>
                    e.date.getDate() === curr.date.getDate() &&
                    e.date.getMonth() === curr.date.getMonth() &&
                    e.date.getFullYear() === curr.date.getFullYear()) === undefined ?
                    [...acc, curr] : acc
            , [])
}

type MinMaxAvg = {
    min: number
    max: number
    avg: number
}
export const getMaxMinAndAvg = (values: number[]): MinMaxAvg => {
    const min = values.reduce((acc: number, curr: number) => acc < curr ? acc : curr)
    const max = values.reduce((acc: number, curr: number) => acc > curr ? acc : curr)
    const avg = (max + min) / 2

    return { min, max, avg }
}