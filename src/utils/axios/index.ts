import axios, { type AxiosInstance } from "axios";
import type { AxiosOptions } from "@/types/axios";

export const createInstance = ({ 
    base, 
    credentials = false }: AxiosOptions
): AxiosInstance => {
    return axios.create({
        baseURL: base,
        withCredentials: credentials,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
