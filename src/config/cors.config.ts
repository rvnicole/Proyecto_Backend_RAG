import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        console.log("Origen: ", origin);
        callback(null, true);
    }
}