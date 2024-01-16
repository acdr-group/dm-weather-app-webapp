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

/**
 * Retrieves the location data for a given city and country string.
 *
 * @param {string} cityAndCountryString - The city and country string to search for.
 * @returns {Promise<AxiosResponse<Location[]>>} - A promise that resolves to the API response containing the location data.
 */
export const getLocation = async (cityAndCountryString: string): Promise<AxiosResponse<Location[]>> => {
    return await axios.get<Location[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${cityAndCountryString}&cnt=1&limit=5&appid}`);
}