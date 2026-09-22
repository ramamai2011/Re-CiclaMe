"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const { readFileSync, writeFileSync } = require("fs");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
const archivo = "./Code/usuarios.json";
const contenido = readFileSync(archivo, "utf-8");
const usuarios = contenido.trim() ? JSON.parse(contenido) : [];
const datosUsuarioNuevo = [];
app.post("/api/register/correo/button", (req, res) => {
    const { correo } = req.body;
    if (!correo) {
        return res.status(400).json({ mensaje: "Por favor escriba su correo" });
    }
    if (!correo.includes("@")) {
        return res.status(400).json({ mensaje: "El correo es inválido" });
    }
    // Chequear que no se repita
    if (usuarios.some((usuario) => usuario.correo === correo)) {
        return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }
    // Chequear si el correo ya existe en usuarios.json
    if (usuarios.some((usuario) => usuario.correo === correo)) {
        return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }
    // Agregar el correo al array de nuevos usuarios
    datosUsuarioNuevo.push({ correo });
    // Responder con un mensaje de éxito
    return res.status(201).json({ mensaje: "Correo registrado correctamente" });
    console.log(datosUsuarioNuevo);
});
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
app.post("/api/register/nombre/button", (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ mensaje: "Porfavor escriba su nombre" });
    }
    datosUsuarioNuevo.push({
        nombre
    });
    window.location.href = '/terceraprincipal2/signup_nombre';
    return res.status(201).json({ mensaje: "Nombre registrado correctamente" });
});
app.post("/api/register/clave/button", (req, res) => {
    const { clave, clave_repetida } = req.body;
    if (!clave || !clave_repetida) {
        return res.status(400).json({ mensaje: "Porfavor escriba su clave" });
    }
    if (clave !== clave_repetida) {
        return res.status(400).json({ mensaje: "Las claves no coinciden" });
    }
    datosUsuarioNuevo.push({
        clave
    });
    window.location.href = '/terceraprincipal2/signup_clave';
    return res.status(201).json({ mensaje: "Contraseña registrado correctamente" });
});
app.post("/api/register/postal/button", (req, res) => {
    const { postal } = req.body;
    if (!postal) {
        return res.status(400).json({ mensaje: "Porfavor escriba su código postal" });
    }
    if (Number(postal) > 1440 || Number(postal) < 1000) {
        return res.status(400).json({ mensaje: "El código postal es inválido" });
    }
    datosUsuarioNuevo.push({
        postal
    });
    // Guardar el nuevo usuario en usuarios.json
    usuarios.push(datosUsuarioNuevo[0]);
    writeFileSync(archivo, JSON.stringify(usuarios, null, 2));
    window.location.href = '/terceraprincipal2/signup_postal';
    return res.status(201).json({ mensaje: "Código postal registrado correctamente" });
});
//# sourceMappingURL=server.js.map