import z from "zod";

export const ingestaBodySchema = z.object({
    user: z.string(),
    title: z.string()
});

export const ingestaFileSchema = z.object({
    fieldname: z.literal('document'),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.literal('application/pdf'),
    buffer: z.unknown(),
    size: z.number()
});