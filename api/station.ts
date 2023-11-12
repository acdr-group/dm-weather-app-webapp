import {Station} from "@/models/station";
import axios, {AxiosResponse} from "axios";

export const getStationByIdApi = async (id: number): Promise<AxiosResponse<Station, any>> => {
    return await axios.get<Station>(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL!}/stations/${id}`)
}