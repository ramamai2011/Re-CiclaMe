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
    // compruebo que no falten datos
    if (!correo || !nombre || !clave || !clave_repetida  || !postal) {
        return res.status(400).json({mensaje: "Faltan datos por completar"})
    }
    // compruebo contraseña
    if (clave !== clave_repetida) {
        return res.status(400).json({mensaje: "Las contraseñas no coincide"})
    }
    // compruebo correo
    if (!correo.includes("@")) {
        return res.status(400).json({mensaje: "El correo es inválido"})
    }
    // compruebo postal
    if (postal.length < 4) {
        return res.status(400).json({mensaje: "Código postal no válido"})
    }

    console.log("Usuario registrado")
    console.log({correo, nombre, clave, postal})
    
    return res.status(201).json({mensaje: "Usuario registrado correctamente"})

});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
