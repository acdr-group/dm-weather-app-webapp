"use client"
import {Station} from "@/models/station";
import {Sensor, SensorListResponse} from "@/models/sensor";
import {SensorMeasurementWithTimestamps} from "@/models/sensorMeasurement";
import {getReadingsApi, ReadingsQueryParams} from "@/api/reading";
import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {getStationByIdApi} from "@/api/station";
import {getSensorOfStationBySensorIdApi, getSensorsOfStationApi} from "@/api/sensor";
import {getWeatherApi, Weather} from "@/api/weather"
import {Forecast, getForecastApi} from "@/api/forecast"
import {Coordinate} from "@/api/coordinate";

type ContextOutput = {
    getStationById: (id: number) => Promise<AxiosResponse<Station, any>>
    getSensorsOfStation: (stationId: number) => Promise<AxiosResponse<Sensor, any>>
    getSensorOfStationBySensorId: (stationId: number, sensorId: number) => Promise<AxiosResponse<SensorListResponse, any>>
    getReadings: (queryParams: ReadingsQueryParams) => Promise<AxiosResponse<SensorMeasurementWithTimestamps, any>>

    getWeather: () => Promise<Weather>
    getForecast: () => Promise<Forecast>
}

// @ts-ignore
const ApplicationContext = createContext<ContextOutput>({})

export const useApplicationContext = (): ContextOutput => {
    return useContext(ApplicationContext)
}

export const START_DATE_STAMP_OF_BACKWARDS_DELIVERY_OF_DATA = "2022-09-01T00:00:00Z"

type PropsApplicationContext = PropsWithChildren & {}

const INITIAL_COORDINATE: Coordinate = {
    lat: 49.0068705,
    lon: 8.4034195,
}
export const ApplicationContextProvider: React.FC<PropsApplicationContext> = (props: PropsApplicationContext) => {

    const [coordinate, setCoordinate] = useState<Coordinate>(INITIAL_COORDINATE);

    const baseAxiosRequestConfig: AxiosRequestConfig<string> = {
        method: "GET",
        url: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL as string,
    };

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

    const getWeather = async (): Promise<Weather> => {
        // TODO: Introduce a new context to store global query params like lang, units, lat and lon
        const requestConfig = {
            ...baseAxiosRequestConfig,
            url: `${baseAxiosRequestConfig.url}/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&units=metric&lang=de`
        }
        const response = await getWeatherApi(requestConfig)
        return formatWeatherResponse(response.data);
    }

    const getForecast = async (): Promise<Forecast> => {
        const requestConfig = {
            ...baseAxiosRequestConfig,
            url: `${baseAxiosRequestConfig.url}/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&units=metric&lang=de`
        }
        const response = await getForecastApi(requestConfig)
        return {
            ...response.data,
            weatherList: response.data.weatherList.map(w => formatWeatherResponse(w))
        };
    }

    const changeLocation = (cityName: string) => {

    }

    return (
        <ApplicationContext.Provider value={{
            getStationById: getStationById,
            getSensorsOfStation: getSensorsOfStation,
            getSensorOfStationBySensorId: getSensorOfStationBySensorId,
            getReadings: getReadings,

            getWeather,
            getForecast,
        }}>
            {props.children}
        </ApplicationContext.Provider>
    )
}

type DataValueMap = {
    date: Date
    value: number
}

type MinMaxAvg = {
    min: number
    max: number
    avg: number
}

const formatWeatherResponse = (weather: any): Weather => {
    return {
        ...weather,
        dateTime: new Date(weather.dateTime * 1000),
        sunrise: new Date(weather.sunrise * 1000),
        sunset: new Date(weather.sunset * 1000),
    }
}