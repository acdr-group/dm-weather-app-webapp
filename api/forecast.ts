import {Weather} from "@/api/weather";
import axios, {
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type Forecast = {
  weatherList: Weather[];
}

/**
 * Retrieves the forecast data from a weather API.
 * @async
 * @param {AxiosRequestConfig} requestConfig - The configuration for the request.
 * @returns {Promise<AxiosResponse<Forecast>>} - A promise that resolves to the forecast data.
 */
export const getForecastApi = async (requestConfig: AxiosRequestConfig): Promise<AxiosResponse<Forecast>> => {
  return await axios.request<Forecast>(requestConfig)
}