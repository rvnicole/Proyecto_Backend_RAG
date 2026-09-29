import { Router } from "express";
import { IngestaController } from "../controllers/ingesta.controller.ts";
import uploadMiddleware from "../middleware/upload.middelware.ts";
import validarIngesta from "../middleware/validarIngesta.middleware.ts";

const router = Router();

router.post("/ingesta",
    uploadMiddleware,
    validarIngesta,
    IngestaController.ingesta
);

export default router;