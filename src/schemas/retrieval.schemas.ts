import z from "zod";

export const retrievalRequestSchema = z.object({
    user: z.string(),
    prompt: z.string(),
    title: z.string()
});