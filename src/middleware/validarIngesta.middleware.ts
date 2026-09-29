import { NextFunction, Request, Response } from 'express';
import { ingestaBodySchema, ingestaFileSchema } from '../schemas/ingesta.schema.ts';

const validarIngesta = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json({ success: false, errors: ["No se recibió ningún archivo"] });
    }

    const resultadoFile = ingestaFileSchema.safeParse(req.file);
    if (!resultadoFile.success) {
        const errores = resultadoFile.error.issues.map(i => i.message);
        return res.status(400).json({ success: false, errors: errores });
    }

    const resultadoBody = ingestaBodySchema.safeParse(req.body);
    if (!resultadoBody.success) {
        const errores = resultadoBody.error.issues.map(i => i.message);
        return res.status(400).json({ success: false, errors: errores });
    }

    next();
};

export default validarIngesta;