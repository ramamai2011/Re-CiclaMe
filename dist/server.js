"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const { readFileSync, writeFileSync } = require("fs");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.post("/api/register/button", (req, res) => {
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
    if (postal.length < 4 || Number(postal) > 1440) {
        return res.status(400).json({ mensaje: "Código postal no válido" });
    }
    console.log("Usuario registrado");
    console.log({ correo, nombre, clave, postal });
    const archivo = "../Code/usuario.json";
    const contenido = readFileSync(archivo, "utf-8");
    const usuarios = JSON.parse(contenido);
    const nuevoUsuario = {
        correo,
        nombre,
        clave,
        postal
    };
    usuarios.push(nuevoUsuario);
    writeFileSync(archivo, JSON.stringify(usuarios, null, 2));
    return res.status(201).json({ mensaje: "Usuario registrado correctamente" });
});
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map