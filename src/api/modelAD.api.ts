import { api } from "../config/axios.config.ts";
import { Readable } from "node:stream";

type ResponseModelType = {
    message: string, 
    text_history: string,
    signal: AbortSignal
}

export const getResponseModel = async (data: ResponseModelType) => {
    try {
        const stream = await api.post<Readable>("/", 
            {
                message: data.message,
                text_history: data.text_history
            }, 
            {
                responseType: "stream",
                signal: data.signal,
                timeout: 0
        });

        return stream.data;
    }
    catch(error) {
        console.log("ERROR-MODEL-AD: ", error);
    }
}