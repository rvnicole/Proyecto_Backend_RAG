import multer, { FileFilterCallback } from "multer";
import { NextFunction, Request, Response } from 'express';

// Guarda el documento como buffer en memoria
const storage = multer.memoryStorage();

// Documentos permitidos
const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    const documentosPermidos = ["application/pdf"];

    if( documentosPermidos.includes(file.mimetype) ) {
        callback(null, true);
    } 
    else {
        const error = new Error("Solo se permiten archivos PDF");
        callback(error);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // Documentos de max 10MB
    }
});

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const cargador = upload.single("document");

    cargador(req, res, (error) => {
        if( error ) {
            return res.status(400).json({ success: false, errors: [error.message] });
        }
        
        next();
    });
};

export default uploadMiddleware;