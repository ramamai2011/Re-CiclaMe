import express = require("express");
import cors = require("cors");
const { readFileSync, writeFileSync } = require("fs");
import type { Request, Response } from "express";
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

interface registroUsuario {
  correo: string;
  nombre: string;
  clave: string;
  clave_repetida: string;
  postal: string;
}

const archivo = "./Code/usuarios.json";
const contenido = readFileSync(archivo, "utf-8");
const usuarios = contenido.trim() ? JSON.parse(contenido) : [];
let datosUsuarioNuevo: Partial<registroUsuario>[] = [];

// app.post("/api/register/button", (req: Request<{}, {}, registroUsuario>, res: Response) => {
//     const { correo, nombre, clave, clave_repetida, postal } = req.body;

//     if (!correo || !nombre || !clave || !clave_repetida || !postal) {
//         return res.status(400).json({ mensaje: "Faltan datos por completar" });
//     }

//     if (clave !== clave_repetida) {
//         return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
//     }

//     if (clave.length < 5) {
//         return res.status(400).json({ mensaje: "La contraseña debe tener al menos 5 caracteres" });
//     }

//     if (!correo.includes("@")) {
//         return res.status(400).json({ mensaje: "El correo es inválido" });
//     }

//     if (postal.length < 4 || Number(postal) > 1440) {
//         return res.status(400).json({ mensaje: "Código postal no válido" });
//     }

//     if (usuarios.some((usuario: registroUsuario) => usuario.correo === correo)) {
//         return res.status(400).json({ mensaje: "El correo ya está registrado" });
//     }

//     if (usuarios.some((usuario: registroUsuario) => usuario.nombre === nombre)) {
//         return res.status(400).json({ mensaje: "El nombre de usuario ya está registrado" });
//     }

//     usuarios.push({ correo, nombre, clave, postal });
//     writeFileSync(archivo, JSON.stringify(usuarios, null, 2));

//     return res.status(201).json({ mensaje: "Usuario registrado correctamente" });
// });

app.post(
  "/api/register/correo/button",
  (req: Request<{}, {}, { correo: string }>, res: Response) => {
    const { correo } = req.body;

    if (!correo) {
      return res.status(400).json({ mensaje: "Por favor escriba su correo" });
    }

    if (!correo.includes("@")) {
      return res.status(400).json({ mensaje: "El correo es inválido" });
    }

    if (
      usuarios.some((usuario: registroUsuario) => usuario.correo === correo)
    ) {
      return res.status(200).json({
        redirigir: "/terceraprincipal2/HTML/login.html",
        mensaje: "El correo ya está registrado, redirigiendo a login.",
      });
    }

    // Agregar el correo al array de nuevos usuarios
    datosUsuarioNuevo.push({ correo });

    // Responder con un mensaje de éxito
    return res
      .status(201)
      .json({ mensaje: "Correo no existente, llevando a registro" });
    console.log(datosUsuarioNuevo);
  },
);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.post(
  "/api/register/nombre/button",
  (req: Request<{}, {}, registroUsuario>, res: Response) => {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ mensaje: "Porfavor escriba su nombre" });
    }

    datosUsuarioNuevo.push({
      nombre,
    });

    window.location.href = "/terceraprincipal2/signup_nombre";

    return res.status(201).json({ mensaje: "Nombre registrado correctamente" });
  },
);

app.post(
  "/api/register/clave/button",
  (req: Request<{}, {}, registroUsuario>, res: Response) => {
    const { clave, clave_repetida } = req.body;

    if (!clave || !clave_repetida) {
      return res.status(400).json({ mensaje: "Porfavor escriba su clave" });
    }

    if (clave !== clave_repetida) {
      return res.status(400).json({ mensaje: "Las claves no coinciden" });
    }

    datosUsuarioNuevo.push({
      clave,
    });

    return res
      .status(201)
      .json({ mensaje: "Contraseña registrado correctamente" });
  },
);

app.post(
  "/api/register/postal/button",
  (req: Request<{}, {}, registroUsuario>, res: Response) => {
    const { postal } = req.body;

    if (!postal) {
      return res
        .status(400)
        .json({ mensaje: "Porfavor escriba su código postal" });
    }

    if (Number(postal) > 1440 || Number(postal) < 1000) {
      return res.status(400).json({ mensaje: "El código postal es inválido" });
    }

    datosUsuarioNuevo.push({
      postal,
    });

    // Guardar el nuevo usuario en usuarios.json
    usuarios.push(datosUsuarioNuevo[0]);
    writeFileSync(archivo, JSON.stringify(usuarios, null, 2));

    return res
      .status(201)
      .json({ mensaje: "Código postal registrado correctamente" });
  },
);

// Pedir usuario por correo para iniciar sesion y mostrar el nombred

app.post(
  "/api/buscar_usuario/correo/nombre_usuario",
  (req: Request<{}, {}, { correo: string }>, res: Response) => {
    const { correo } = req.body;
    if (!correo) {
      return res.status(400).json({ error: "Falta el correo electrónico" });
    }
    const usuario = usuarios.find((user: any) => user.correo === correo);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    res.json({
      nombre: usuario.nombre,
    });
  },
);

// Recibir datos de usuario para registrarse
