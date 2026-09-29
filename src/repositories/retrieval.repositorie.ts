import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RetrievalRequestType } from "../types/retrieval.types.ts";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";

type RetrievalRepositorieType = {
    embeddings: GoogleGenerativeAIEmbeddings,
    data: RetrievalRequestType
};

export class RetrievalRepositorie {
    static retrieval = async ({ embeddings, data }: RetrievalRepositorieType) => {
        //console.log("Desde repositorie retrieval: ", data);

        const vectorStore = await PGVectorStore.initialize(embeddings, {
            postgresConnectionOptions: {
                connectionString: process.env.DATABASE_URL,
            },
            tableName: "document_embeddings",
        });
        
        const prompt = "Profesor Albus Dumbledore, " + data.prompt
        const results = await vectorStore.similaritySearch(prompt, 4, {
            user: data.user,
            title: data.title
        });

        await vectorStore.end();

        return results;
    }
}