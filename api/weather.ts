import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from "axios";

export type Weather = {
    cityName: string;
    clouds: {
        all: number;
    };
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
    wind: {
        deg: number;
        gust: number;
        speed: number;
    };
}

export const getWeatherApi = async (requestConfig: AxiosRequestConfig): Promise<AxiosResponse<Weather>> => {
    return await axios.request<Weather>(requestConfig)
}