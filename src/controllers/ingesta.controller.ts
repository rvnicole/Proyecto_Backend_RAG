import { Request, Response, NextFunction } from "express";
import {  IngestaService } from "../services/ingesta.service.ts";
import { IngestaFileType } from "../types/ingesta.types.ts";

export class IngestaController {
    static ingesta = async (req: Request, res: Response, next: NextFunction) => {
        const document = req.file as IngestaFileType;
        const {user, title} = req.body;

        try {
            await IngestaService.ingesta({ user, title, document });
            return res.status(200).json({ success: true, message: "Documento procesado correctamente" });
        }
        catch(error) {
            console.log("ERROR-INGESTA: ", error);
            return res.status(400).json({ success: false, errors: ["Algo salió mal al procesar el documento."] });
        }
    }
}