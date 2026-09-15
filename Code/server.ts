import express = require("express");
import cors = require("cors"); // Importa el paquete cors
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Habilita CORS para todas las solicitudes
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

interface registroUsuario {
    correo: string,
    nombre: string,
    clave: string,
    clave_repetida: string,
    postal: string
}

app.post("/api/register/button", (req: Request<{}, {}, registroUsuario>, res: Response) => {
    const { correo, nombre, clave, clave_repetida, postal } = req.body;

    if (!correo || !nombre || !clave || !clave_repetida || !postal) {
        return res.status(400).json({ mensaje: "Faltan datos por completar" });
    }

    if (clave !== clave_repetida) {
        return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
    }

    if (!correo.includes("@")) {
        return res.status(400).json({ mensaje: "El correo es inválido" });
    }

    if (postal.length < 4) {
        return res.status(400).json({ mensaje: "Código postal no válido" });
    }

    console.log("Usuario registrado");
    console.log({ correo, nombre, clave, postal });

    return res.status(201).json({ mensaje: "Usuario registrado correctamente" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});