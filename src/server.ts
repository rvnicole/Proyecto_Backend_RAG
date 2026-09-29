import express, { Request, Response } from "express";
import cors from "cors";
import { corsConfig } from "./config/cors.config.ts";
import routerIngesta from "./routes/ingesta.route.ts";
import routerRetrieval from "./routes/retrieval.routes.ts";

const server = express();

server.use(express.json());

server.use(cors(corsConfig));

server.use(routerIngesta);
server.use(routerRetrieval);

server.get("/", ( req: Request, res: Response ) => {
    res.status(200).json({ success: true, message: "Hola mundo!"});
});

export default server;