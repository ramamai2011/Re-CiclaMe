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
    if (clave.length < 5) {
        return res.status(400).json({ mensaje: "La contraseña debe tener al menos 5 caracteres" });
    }
    if (!correo.includes("@")) {
        return res.status(400).json({ mensaje: "El correo es inválido" });
        console.log("Correo inválido");
    }
    if (postal.length < 4 || Number(postal) > 1440) {
        return res.status(400).json({ mensaje: "Código postal no válido" });
    }
    // chequear en usuarios.json(archivo) si el correo ya existe ysi el usuario esta ocupado
    const archivo = "./Code/usuarios.json";
    const contenido = readFileSync(archivo, "utf-8");
    const usuarios = contenido.trim() ? JSON.parse(contenido) : [];
    if (usuarios.some((usuario) => usuario.correo === correo)) {
        return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }
    if (usuarios.some((usuario) => usuario.nombre === nombre)) {
        return res.status(400).json({ mensaje: "El nombre de usuario ya está registrado" });
    }
    usuarios.push({
        correo,
        nombre,
        clave,
        postal
    });
    writeFileSync(archivo, JSON.stringify(usuarios, null, 2));
    return res.status(201).json({ mensaje: "Usuario registrado correctamente" });
});
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map