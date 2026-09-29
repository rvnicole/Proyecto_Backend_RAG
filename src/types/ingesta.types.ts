import z from "zod";
import { ingestaBodySchema, ingestaFileSchema } from "../schemas/ingesta.schema.ts";

export type IngestaBodyType = z.infer<typeof ingestaBodySchema>;
export type IngestaFileType = z.infer<typeof ingestaFileSchema>;

export type IngestaType = IngestaBodyType & {
    document: IngestaFileType
};
