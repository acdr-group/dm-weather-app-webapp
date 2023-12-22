import {Weather} from "@/api/weather";
import axios, {
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type Forecast = {
  weatherList: Weather[];
}

export const getForecastApi = async (requestConfig: AxiosRequestConfig): Promise<AxiosResponse<Forecast>> => {
  return await axios.request<Forecast>(requestConfig)
}