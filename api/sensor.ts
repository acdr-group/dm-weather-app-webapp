import axios, {AxiosResponse} from "axios";
import {Sensor, SensorListResponse} from "@/models/sensor";

export const getSensorsOfStationApi = async (stationId: number): Promise<AxiosResponse<Sensor, any>> => {
    return await axios.get<Sensor>(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL!}/stations/${stationId}/sensors`)
}

export const getSensorOfStationBySensorIdApi = async (stationId: number, sensorId: number): Promise<AxiosResponse<SensorListResponse, any>> => {
    return await axios.get<SensorListResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL!}/stations/${stationId}/sensors/${sensorId}`,
    )
}