import { Router } from "express";
import validarRetrieval from "../middleware/validarRetrieval.middleware.ts";
import { RetrievalController } from "../controllers/retrieval.controller.ts";

const router = Router();

router.post("/retrieval", 
    validarRetrieval,
    RetrievalController.retrievalData
);

export default router;