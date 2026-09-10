import express = require("express"); 
import type { Request, Response } from "express"; 

const app = express();
const PORT = 3000;

interface registroUsuario {
    correo: string,
    nombre: string,
    clave:string,
    clave_repetida: string,
    postal: string
}
app.use(express.json());

app.post("/api/register/button", (req: Request<{}, {}, registroUsuario>, res: Response) => {
    const {correo, nombre, clave, clave_repetida, postal} = req.body
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
