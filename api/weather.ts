import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from "axios";

export type Weather = {
    cityName: string;
    clouds: number;
    dateTime: Date;
    dateTimeText: string;
    description: string;
    feelsLike: number;
    humidity: number;
    icon: string;
    main: string;
    pressure: number;
    pressureGroundLevel: number;
    pressureSeaLevel: number;
    sunrise: Date;
    sunset: Date;
    temp: number;
    tempMax: number;
    tempMin: number;
    timezone: number;
    visibility: number;
    windSpeed: number;
    windDirection: number;
    windGust: number;
}

/**
 * Sends a request to the weather API and retrieves the weather data.
 * @param {AxiosRequestConfig} requestConfig - The request configuration object for the API call.
 * @returns {Promise<AxiosResponse<Weather>>} - A promise that resolves to the axios response containing the weather data.
 */
export const getWeatherApi = async (requestConfig: AxiosRequestConfig): Promise<AxiosResponse<Weather>> => {
    return await axios.request<Weather>(requestConfig)
}