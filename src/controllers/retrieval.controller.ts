import { Request, Response, NextFunction } from "express"
import { RetrievalService } from "../services/retrieval.service.ts";
import { pipeline } from "node:stream/promises";

export class RetrievalController {
    static retrievalData = async (req: Request, res: Response, next:NextFunction) => {       
        try {
            const controller = new AbortController();

            const stream = await RetrievalService.retrieval(req.body, controller.signal );

            await pipeline(stream!, res);
        }
        catch(error) {
            console.log("ERROR-Retrieval: ", error);
            return res.status(400).json({ success: false, errors: ["Algo salió mal al procesar la petición."] });
        }
    }
}