"use client";
import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {AxiosRequestConfig} from "axios";
import {getWeatherApi, Weather} from "@/api/weather"
import {Forecast, getForecastApi} from "@/api/forecast"
import {Coordinate} from "@/api/coordinate";

type ContextOutput = {
    getWeather: () => Promise<Weather>
    getForecast: () => Promise<Forecast>
}

// @ts-ignore
const ApplicationContext = createContext<ContextOutput>({})

export const useApplicationContext = (): ContextOutput => {
    return useContext(ApplicationContext)
}

type PropsApplicationContext = PropsWithChildren & {}

const INITIAL_COORDINATE: Coordinate = {
    lat: 49.0068705,
    lon: 8.4034195,
}
export const ApplicationContextProvider: React.FC<PropsApplicationContext> = (props: PropsApplicationContext) => {

    const [coordinate] = useState<Coordinate>(INITIAL_COORDINATE);

    const baseAxiosRequestConfig: AxiosRequestConfig<string> = {
        method: "GET",
        url: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL as string,
    };

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

    return (
        <ApplicationContext.Provider value={{
            getWeather,
            getForecast,
        }}>
            {props.children}
        </ApplicationContext.Provider>
    )
}

const formatWeatherResponse = (weather: any): Weather => {
    return {
        ...weather,
        dateTime: new Date(weather.dateTime * 1000),
        sunrise: new Date(weather.sunrise * 1000),
        sunset: new Date(weather.sunset * 1000),
    }
}