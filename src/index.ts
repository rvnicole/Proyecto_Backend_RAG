import dotenv from "dotenv";
import server from "./server.ts";

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor iniciado correctamente en el puerto ${PORT}`);
});