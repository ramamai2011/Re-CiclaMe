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
let datosUsuarioNuevo = [];
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
app.post("/api/register/correo/button", (req, res) => {
    const { correo } = req.body;
    if (!correo) {
        return res.status(400).json({ mensaje: "Por favor escriba su correo" });
    }
    if (!correo.includes("@")) {
        return res.status(400).json({ mensaje: "El correo es inválido" });
    }
    if (usuarios.some((usuario) => usuario.correo === correo)) {
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
        nombre,
    });
    window.location.href = "/terceraprincipal2/signup_nombre";
    return res.status(201).json({ mensaje: "Nombre registrado correctamente" });
});
// app.post(
//   "/api/register/clave/button",
//   (req: Request<{}, {}, registroUsuario>, res: Response) => {
//     const { clave } = req.body;
//     if (!clave || !clave_repetida) {
//       return res.status(400).json({ mensaje: "Porfavor escriba su clave" });
//     }
//     if (clave !== clave_repetida) {
//       return res.status(400).json({ mensaje: "Las claves no coinciden" });
//     }
//     datosUsuarioNuevo.push({
//       clave,
//     });
//     return res
//       .status(201)
//       .json({ mensaje: "Contraseña registrado correctamente" });
//   },
// );
app.post("/api/register/postal/button", (req, res) => {
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
});
// Pedir usuario por correo para iniciar sesion y mostrar el nombred
app.post("/api/buscar_usuario/correo/nombre_usuario", (req, res) => {
    const { correo } = req.body;
    if (!correo) {
        return res.status(400).json({ error: "Falta el correo electrónico" });
    }
    const usuario = usuarios.find((user) => user.correo === correo);
    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado",
        });
    }
    res.json({
        nombre: usuario.nombre,
    });
});
// Recibir datos de usuario para registrarse
app.post("/api/register/usuario/crear_cuenta", (req, res) => {
    const { correo, nombre, clave } = req.body;
    if (!correo || !nombre || !clave) {
        return res.status(400).json({ mensaje: "Faltan datos por completar" });
    }
    // Chequear que el nombre no esta ocupado
    if (usuarios.some((usuario) => usuario.nombre === nombre)) {
        return res
            .status(400)
            .json({ mensaje: "El nombre de usuario ya está registrado" });
    }
    if (clave.length < 5) {
        return res
            .status(400)
            .json({ mensaje: "La contraseña debe tener al menos 5 caracteres" });
    }
    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
});
app.post("/api/register/ubicacion/", (req, res) => {
    const { postal, nombre, correo, clave } = req.body;
    if (!postal || !nombre || !correo || !clave) {
        return res.status(400).json({
            mensaje: "Faltan datos por completar",
            datos: { postal, nombre, correo, clave },
        });
    }
    if (Number(postal) > 1440 || Number(postal) < 1000) {
        return res.status(400).json({ mensaje: "El código postal es inválido" });
    }
    if (usuarios.some((usuario) => usuario.correo === correo)) {
        return res.status(409).json({ mensaje: "El correo ya está registrado" });
    }
    if (usuarios.some((usuario) => usuario.nombre === nombre)) {
        return res
            .status(409)
            .json({ mensaje: "El nombre de usuario ya está registrado" });
    }
    const nuevoId = usuarios.length > 0
        ? Math.max(...usuarios.map((usuario) => usuario.id || 0)) + 1
        : 1;
    let nuevoUsuario = {
        id: nuevoId,
        correo,
        nombre,
        clave,
        postal,
        puntos: 0,
    };
    usuarios.push(nuevoUsuario);
    writeFileSync(archivo, JSON.stringify(usuarios, null, 2));
    return res
        .status(201)
        .json({ mensaje: "Usuario registrado correctamente", id: nuevoId });
});
// Login
app.post("/api/login/button", (req, res) => {
    const { correo, clave } = req.body;
    if (!correo || !clave) {
        return res.status(400).json({ mensaje: "Faltan datos por completar" });
    }
    const usuario = usuarios.find((usuario) => usuario.correo === correo && usuario.clave === clave);
    if (!usuario) {
        return res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
    }
    return res.status(200).json({ mensaje: "Inicio de sesión exitoso", nombre: usuario.nombre });
});
// Ver para el home:
/* Valenn97: como harias parra que al registrarse se cree el usuario pero con un id unico arrancando de 1?

GitHub Copilot: Para agregar un ID único que comience desde 1 y se incremente automáticamente para cada nuevo usuario registrado, puedes modificar el código para incluir un campo `id` en el objeto del usuario. Este ID se puede calcular como el máximo ID existente en el archivo `usuarios.json` más 1, o como 1 si no hay usuarios registrados.

Aquí está cómo puedes modificar el código para lograrlo:

### Modificación del endpoint `/api/register/ubicacion/`
```typescript
app.post(
  "/api/register/ubicacion/",
  (req: Request<{}, {}, registroUsuario>, res: Response) => {
    const { postal, nombre, correo, clave } = req.body;

    if (!postal || !nombre || !correo || !clave) {
      return res.status(400).json({
        mensaje: "Faltan datos por completar",
        datos: { postal, nombre, correo, clave },
      });
    }

    if (Number(postal) > 1440 || Number(postal) < 1000) {
      return res.status(400).json({ mensaje: "El código postal es inválido" });
    }

    if (
      usuarios.some((usuario: registroUsuario) => usuario.correo === correo)
    ) {
      return res.status(409).json({ mensaje: "El correo ya está registrado" });
    }

    if (
      usuarios.some((usuario: registroUsuario) => usuario.nombre === nombre)
    ) {
      return res
        .status(409)
        .json({ mensaje: "El nombre de usuario ya está registrado" });
    }

    // Calcular el nuevo ID único
    const nuevoId = usuarios.length > 0
      ? Math.max(...usuarios.map((usuario: any) => usuario.id || 0)) + 1
      : 1;

    // Guardar el nuevo usuario en usuarios.json
    let nuevoUsuario: registroUsuario & { id: number } = {
      id: nuevoId,
      correo,
      nombre,
      clave,
      postal,
      puntos: 0,
    };
    usuarios.push(nuevoUsuario);
    writeFileSync(archivo, JSON.stringify(usuarios, null, 2));
    return res
      .status(201)
      .json({ mensaje: "Usuario registrado correctamente", id: nuevoId });
  },
);
```

### Cambios realizados:
1. **Cálculo del ID único**:
   - Se calcula el nuevo ID como el máximo ID existente en el array `usuarios` más 1.
   - Si no hay usuarios registrados, el ID comienza en 1.

2. **Adición del campo `id`**:
   - Se agrega el campo `id` al objeto del nuevo usuario.

3. **Respuesta con el ID**:
   - Se incluye el nuevo ID en la respuesta para confirmar que se generó correctamente.

### Consideraciones:
- Asegúrate de que todos los usuarios en `usuarios.json` tengan un campo `id` para evitar errores al calcular el máximo.
- Si el archivo `usuarios.json` ya contiene usuarios sin un campo `id`, puedes agregarlo manualmente o escribir un script para actualizar los datos existentes.

Valenn97: y como dirias vos de hacer el tema de la home??? que cuando nomas entre a la home se pida con un fetch get(o post) el usuario, puntos, etc para mostrar o que se guarde en la localstorage

GitHub Copilot: Para implementar una funcionalidad en la **home** que obtenga los datos del usuario (como nombre, puntos, etc.) al cargar la página, puedes usar un `fetch` para realizar una solicitud al servidor. Luego, puedes guardar los datos en el `localStorage` para usarlos en la interfaz.

### Pasos para implementar:

#### 1. **Crear un endpoint en el servidor para obtener datos del usuario**
Modifica tu servidor para incluir un endpoint que reciba el correo del usuario y devuelva sus datos.

```typescript
app.post(
  "/api/usuario/datos",
  (req: Request<{}, {}, { correo: string }>, res: Response) => {
    const { correo } = req.body;

    if (!correo) {
      return res.status(400).json({ mensaje: "Falta el correo del usuario" });
    }

    const usuario = usuarios.find((user: registroUsuario) => user.correo === correo);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Enviar los datos del usuario
    return res.status(200).json({
      nombre: usuario.nombre,
      puntos: usuario.puntos,
      correo: usuario.correo,
      postal: usuario.postal,
    });
  }
);
```

#### 2. **Realizar el `fetch` en la página de la home**
En tu archivo de la **home** (por ejemplo, `home.js`), realiza una solicitud al servidor para obtener los datos del usuario. Luego, guarda los datos en el `localStorage`.

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const correoUsuario = localStorage.getItem("correoUsuario");

  if (!correoUsuario) {
    alert("No se encontró un usuario registrado. Redirigiendo al login...");
    window.location.href = "/terceraprincipal2/HTML/login.html";
    return;
  }

  // Hacer un fetch para obtener los datos del usuario
  fetch("http://localhost:3000/api/usuario/datos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo: correoUsuario }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
      return response.json();
    })
    .then((data) => {
      // Guardar los datos en el localStorage
      localStorage.setItem("nombreUsuario", data.nombre);
      localStorage.setItem("puntosUsuario", data.puntos);

      // Mostrar los datos en la interfaz
      document.getElementById("nombre").textContent = data.nombre;
      document.getElementById("puntos").textContent = data.puntos;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un problema al cargar los datos del usuario.");
    });
});
```

#### 3. **Modificar el HTML de la home**
Asegúrate de tener elementos en tu HTML donde se mostrarán los datos del usuario.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <script src="./home.js" defer></script>
</head>
<body>
  <h1>Bienvenido, <span id="nombre"></span></h1>
  <p>Tus puntos: <span id="puntos"></span></p>
</body>
</html>
```

#### 4. **Guardar el correo del usuario al iniciar sesión**
Cuando el usuario inicie sesión o se registre, guarda su correo en el `localStorage` para que esté disponible en la **home**.

```javascript
// Ejemplo de guardar el correo al iniciar sesión
localStorage.setItem("correoUsuario", "correo_del_usuario@example.com");
```

---

### Flujo completo:
1. **Inicio de sesión o registro**:
   - Guarda el correo del usuario en el `localStorage` (`correoUsuario`).

2. **Carga de la home**:
   - Al cargar la página, verifica si el correo está en el `localStorage`.
   - Si no está, redirige al login.
   - Si está, realiza un `fetch` al servidor para obtener los datos del usuario.

3. **Mostrar datos en la interfaz**:
   - Usa los datos obtenidos del servidor para actualizar la interfaz y guárdalos en el `localStorage` para uso futuro.

Este enfoque asegura que los datos del usuario estén disponibles en la **home** y se actualicen dinámicamente.

Valenn97: porque no funciona el login??

GitHub Copilot: El problema principal en tu código parece estar en cómo estás manejando el evento del botón y el valor del correo. Aquí hay algunos puntos que debes revisar y corregir:

### Problemas detectados:

1. **El evento `addEventListener` no está asociado al botón correctamente**:
   - Estás llamando a `addEventListener` sin especificar el elemento al que se debe asociar. Esto significa que el evento no está vinculado al botón `botonsiguiente`.

2. **El valor de `correo` puede ser `null`**:
   - El valor de `correo` se obtiene de `correoUrl` o de `sessionStorage.getItem("correoLogin")`. Si ninguno de estos valores está definido, `correo` será `null`, lo que causará problemas al enviar la solicitud.

3. **Falta de validación de campos**:
   - No estás validando si `correo` o `contraseña` tienen valores antes de enviar la solicitud.

---

### Solución:

#### 1. **Asociar correctamente el evento al botón**:
Asegúrate de que el evento `click` esté vinculado al botón `botonsiguiente`. Cambia el código para usar `botonsiguiente.addEventListener`.

#### 2. **Validar los campos antes de enviar la solicitud**:
Verifica que tanto `correo` como `contraseña` tengan valores antes de realizar el `fetch`.

#### 3. **Guardar el correo en `sessionStorage` después de iniciar sesión**:
Si el inicio de sesión es exitoso, guarda el correo en `sessionStorage` para usarlo en otras páginas.

#### Código corregido:
```javascript
<script>
  const respuestaRegistro = document.getElementById("respuesta_registro");
  const usuario = document.getElementById("usuario_nombre");
  const parametrosUrl = new URLSearchParams(window.location.search);
  const correoUrl = parametrosUrl.get("correo");

  if (correoUrl) {
    parametrosUrl.delete("correo");
    const consulta = parametrosUrl.toString();
    const urlLimpia = `${window.location.pathname}${consulta ? `?${consulta}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", urlLimpia);
  }

  const correo = correoUrl || sessionStorage.getItem("correoLogin");

  async function cargarNombreUsuario() {
    if (!correo) {
      respuestaRegistro.textContent =
        "No se encontró el correo para iniciar sesión.";
      return;
    }

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/buscar_usuario/correo/nombre_usuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo }),
        },
      );
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        respuestaRegistro.textContent =
          datos.mensaje || "No se pudo encontrar el usuario.";
        return;
      }

      usuario.textContent = `@${datos.nombre}`;
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      respuestaRegistro.textContent =
        "Hubo un error al buscar el usuario.";
    }
  }

  cargarNombreUsuario();

  // Iniciar sesión con la API
  const botonsiguiente = document.getElementById("botonsiguiente");
  botonsiguiente.addEventListener("click", async () => {
    const contraseña = document.getElementById("contraseña").value;

    if (!correo || !contraseña) {
      respuestaRegistro.textContent = "Por favor, completa todos los campos.";
      return;
    }

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/login/button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo, clave: contraseña }),
        },
      );
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        respuestaRegistro.textContent =
          datos.mensaje || "Error al iniciar sesión.";
        return;
      }

      // Guardar el correo en sessionStorage
      sessionStorage.setItem("correoLogin", correo);

      // Redirigir a la página de inicio
      window.location.href = "/terceraprincipal2/HTML/home.html";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      respuestaRegistro.textContent =
        "Hubo un error al iniciar sesión.";
    }
  });
</script>
```

---

### Cambios realizados:
1. **Corrección del evento `addEventListener`**:
   - Ahora el evento `click` está correctamente asociado al botón `botonsiguiente`.

2. **Validación de campos**:
   - Se verifica que `correo` y `contraseña` tengan valores antes de realizar la solicitud.

3. **Corrección del cuerpo de la solicitud**:
   - El campo `clave` se envía correctamente en el cuerpo de la solicitud.

4. **Redirección después del inicio de sesión**:
   - Si el inicio de sesión es exitoso, el usuario es redirigido a la página de inicio (`home.html`).

---

### Verifica el servidor:
Asegúrate de que el endpoint `/api/login/button` en tu servidor esté funcionando correctamente y que valide tanto el correo como la contraseña.

Valenn97: pero no la compliques tanto, osea quiero que funcione, no hacerlo ultra profesional agregando tantas lineas, hacelo simple y que funcionne

GitHub Copilot: Entendido, aquí tienes una versión simplificada del código para que el login funcione correctamente:

### Problema principal:
El problema está en cómo se está manejando el valor de `correo` y en la estructura del `fetch`. Vamos a corregirlo.

### Solución simplificada:
```html
<script>
  const botonsiguiente = document.getElementById("botonsiguiente");
  const respuestaRegistro = document.getElementById("respuesta_registro");

  botonsiguiente.addEventListener("click", async () => {
    const correo = sessionStorage.getItem("correoLogin");
    const contraseña = document.getElementById("contraseña").value;

    if (!correo || !contraseña) {
      respuestaRegistro.textContent = "Por favor, completa todos los campos.";
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3000/api/login/button", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, clave: contraseña }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        respuestaRegistro.textContent = datos.mensaje || "Error al iniciar sesión.";
        return;
      }

      // Guardar el correo en sessionStorage y redirigir
      sessionStorage.setItem("correoLogin", correo);
      window.location.href = "/terceraprincipal2/HTML/home.html";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      respuestaRegistro.textContent = "Hubo un error al iniciar sesión.";
    }
  });
</script>
```

### Cambios realizados:
1. **Validación simple**:
   - Se verifica si `correo` y `contraseña` tienen valores antes de enviar la solicitud.

2. **Uso de `sessionStorage`**:
   - Se asume que el correo ya está guardado en `sessionStorage` desde una página anterior.

3. **Redirección**:
   - Si el login es exitoso, redirige directamente a la página de inicio (`home.html`).

4. **Errores manejados de forma básica**:
   - Si hay un error, se muestra un mensaje simple en `respuestaRegistro`.

---

### Flujo:
1. El usuario ingresa su contraseña y hace clic en "Siguiente".
2. Se valida que el correo y la contraseña estén presentes.
3. Se envía la solicitud al servidor.
4. Si el login es exitoso, se redirige al usuario a la página de inicio.
5. Si hay un error, se muestra un mensaje en pantalla.

Esto es más simple y funcional. Asegúrate de que el servidor esté configurado correctamente para manejar el endpoint `/api/login/button`.

Valenn97: Como harias para mostrar la información como nombre de usuario y puntos en la home.html con un post/get??? osea como harias para hacerlo? con el login se me ocurre guardad en el localstorage o algo asi el correo o no se(ayuduame tambien a determinar eso) y despues usandolo en la home se pide los datos del usuario. Pero el tema es en el register, porque cuando guardaba el correo y eso creo q se empezaba a bugear y clonar los usuarios previos en usuariooss.json

GitHub Copilot: Para mostrar la información del usuario (como el nombre y los puntos) en la home.html, podemos seguir un enfoque simple y funcional. Aquí está el plan:

---

### **1. Guardar el correo del usuario al iniciar sesión o registrarse**
Cuando el usuario inicia sesión o se registra, guarda su correo en el `localStorage`. Esto permitirá identificar al usuario en la home.html.

#### Modificación en el login.html:
En el script de inicio de sesión, guarda el correo en el `localStorage` después de un inicio de sesión exitoso.

```javascript
// Guardar el correo en localStorage después de iniciar sesión
localStorage.setItem("correoUsuario", correo);
window.location.href = "/terceraprincipal2/HTML/home.html";
```

---

### **2. Crear un endpoint en el servidor para obtener los datos del usuario**
El servidor debe tener un endpoint que reciba el correo del usuario y devuelva sus datos (nombre, puntos, etc.).

#### Modificación en server.ts:
Agrega este endpoint para buscar al usuario por su correo y devolver sus datos.

```typescript
app.post(
  "/api/usuario/datos",
  (req: Request<{}, {}, { correo: string }>, res: Response) => {
    const { correo } = req.body;

    if (!correo) {
      return res.status(400).json({ mensaje: "Falta el correo del usuario" });
    }

    const usuario = usuarios.find((user: registroUsuario) => user.correo === correo);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Enviar los datos del usuario
    return res.status(200).json({
      nombre: usuario.nombre,
      puntos: usuario.puntos,
    });
  }
);
```

---

### **3. Solicitar los datos del usuario en la home.html**
Cuando se cargue la home.html, realiza un `fetch` al servidor usando el correo almacenado en el `localStorage`. Luego, muestra los datos en la interfaz.

#### Modificación en home.html:
Agrega este script para cargar los datos del usuario al abrir la página.

```javascript
<script>
  document.addEventListener("DOMContentLoaded", async () => {
    const correo = localStorage.getItem("correoUsuario");

    if (!correo) {
      alert("No se encontró un usuario registrado. Redirigiendo al login...");
      window.location.href = "/terceraprincipal2/HTML/login.html";
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3000/api/usuario/datos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const datos = await respuesta.json();

      // Mostrar los datos en la interfaz
      document.querySelector(".holausu").textContent = `Hola, ${datos.nombre}`;
      document.querySelector(".puntocercano").innerHTML = `
        <p>Tus puntos: ${datos.puntos}</p>
      `;
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al cargar los datos del usuario.");
    }
  });
</script>
```

---

### **4. Solucionar el problema de clonación en el registro**
El problema de clonación ocurre porque estás agregando datos al array `datosUsuarioNuevo` sin limpiarlo después de cada registro. Esto hace que los datos previos se mantengan y se dupliquen.

#### Solución en server.ts:
Limpia el array `datosUsuarioNuevo` después de guardar un usuario.

```typescript
// Después de guardar el usuario en usuarios.json
usuarios.push(datosUsuarioNuevo[0]);
writeFileSync(archivo, JSON.stringify(usuarios, null, 2));

// Limpia el array para evitar duplicados
datosUsuarioNuevo = [];
```

---

### **Resumen del flujo completo**:
1. **Login o registro**:
   - Guarda el correo del usuario en el `localStorage` después de un inicio de sesión o registro exitoso.

2. **Home**:
   - Al cargar la página, verifica si el correo está en el `localStorage`.
   - Si no está, redirige al login.
   - Si está, realiza un `fetch` al servidor para obtener los datos del usuario y los muestra en la interfaz.

3. **Evitar duplicados en el registro**:
   - Limpia el array `datosUsuarioNuevo` después de guardar un usuario.

---

### **Ventajas de este enfoque**:
- Es simple y funcional.
- Usa `localStorage` para mantener el correo del usuario entre páginas.
- Evita duplicados en el archivo usuarios.json.
- Los datos del usuario se cargan dinámicamente en la home.html.

Con estos cambios, tu sistema debería funcionar correctamente. */ 
//# sourceMappingURL=server.js.map