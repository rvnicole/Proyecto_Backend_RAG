import { NextFunction, Request, Response } from 'express';
import { retrievalRequestSchema } from '../schemas/retrieval.schemas.ts';

const validarRetrieval = (req: Request, res: Response, next: NextFunction) => {
    const resultadoBody = retrievalRequestSchema.safeParse(req.body);
    if (!resultadoBody.success) {
        const errores = resultadoBody.error.issues.map(i => i.message);
        return res.status(400).json({ success: false, errors: errores });
    }

    next();
};

export default validarRetrieval;