import axios, {AxiosResponse} from "axios";

export type Coordinate = {
    lat: number,
    lon: number,
}

export type Location = {
    name: string
    local_names: Record<string, string>
    lat: number,
    lon: number,
    country: string
    state?: string
}

export const getLocation = async (cityAndCountryString: string): Promise<AxiosResponse<Location[]>> => {
    return await axios.get<Location[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${cityAndCountryString}&cnt=1&limit=5&appid}`);
}