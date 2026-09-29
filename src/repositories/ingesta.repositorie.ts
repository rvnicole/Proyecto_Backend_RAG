import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";

type IngestaRepositorieType = {
    embeddings: GoogleGenerativeAIEmbeddings;
    cleanChuncks: Document[]
};

export class IngestaRepositorie {
    static ingesta = async (data: IngestaRepositorieType) => {
        const { embeddings, cleanChuncks } = data;

        // Iniciar store con la Base de Datos
        const vectorStore = await PGVectorStore.initialize(embeddings, {
            postgresConnectionOptions: {
                connectionString: process.env.DATABASE_URL,
            },
            tableName: "document_embeddings",
        });

        // Agregar los documentos
        await vectorStore.addDocuments(cleanChuncks);

        // Cerrar la conexión
        await vectorStore.end();
    }
}