import z from "zod";
import { retrievalRequestSchema } from "../schemas/retrieval.schemas.ts";

export type RetrievalRequestType = z.infer<typeof retrievalRequestSchema>;