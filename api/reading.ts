import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {SensorMeasurementWithTimestamps} from "@/models/sensorMeasurement";

export type ReadingsQueryParams = {
    start: string,
    end: string,
    stations: string,
    sensors: string,
    flat?: boolean,
    climateClassifications?: boolean
}
export const getReadingsApi = async (queryParams: ReadingsQueryParams): Promise<AxiosResponse<SensorMeasurementWithTimestamps, any>> => {

    const requestConfig: AxiosRequestConfig = {
        params: {...queryParams},
    }

    return await axios.get<SensorMeasurementWithTimestamps>(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL!}/readings`,
        requestConfig
    )
}