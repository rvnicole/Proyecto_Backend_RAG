import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RetrievalRepositorie } from "../repositories/retrieval.repositorie.ts";
import { RetrievalRequestType } from "../types/retrieval.types.ts";
import { getResponseModel } from "../api/modelAD.api.ts";

export class RetrievalService {
    static retrieval = async (data: RetrievalRequestType, signal: AbortSignal) => {
        // Embeddings
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "models/gemini-embedding-001",
            apiKey: process.env.API_KEY_MODEL
        });
        
        // Coincidencias encontradas
        const results = await RetrievalRepositorie.retrieval({ embeddings, data });
        //console.log("Results:", results);

        const pageContent = results.map(result => {
            const content = result.pageContent;
            const page = result.metadata.loc.pageNumber;
            
            return content + "" + `Informacion obtenida en la pagina ${page} del documento `;
        });
        const text_history = pageContent.join(".");

        // Consulta al modelo
        return await getResponseModel({ message: data.prompt, text_history, signal });
    }
}
