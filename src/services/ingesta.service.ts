import { IngestaRepositorie } from "../repositories/ingesta.repositorie.ts";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import { IngestaType } from "../types/ingesta.types.ts";

export class IngestaService {
    static ingesta = async (data: IngestaType) => {
        // Pasar el docuemento que esta en buffer a Blob
        const arregloUnit8 = new Uint8Array(data.document.buffer as ArrayBuffer);
        const documentBlob = new Blob([arregloUnit8], {
            type: "application/pdf"
        });

        // Cargar el documento
        const loader = new PDFLoader(documentBlob);
        const docs = await loader.load();

        // Chunks
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 100
        });

        const chunks = await splitter.splitDocuments(docs);
        const chunksLimit = chunks.slice(0, 99);
        
        const cleanChuncks = chunksLimit.map((chunk, index) => {
            return new Document({
                pageContent: chunk.pageContent,
                metadata: {
                    ...chunk.metadata,
                    user: data.user,
                    title: data.title,
                    index
                }
            });
        }); 

        // Embeddings
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "models/gemini-embedding-001",
            apiKey: process.env.API_KEY_MODEL
        });

        await IngestaRepositorie.ingesta({ embeddings, cleanChuncks });
    }
}