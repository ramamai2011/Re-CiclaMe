"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Declaraciones botones
const correo_input = document.getElementById("correo_input");
const nombre_usuario_input = document.getElementById("usuario_input");
const contraseña_input = document.getElementById("password_input");
const repetir_contraseña_input = document.getElementById("repetir_contraseña");
const postal_input = document.getElementById("codigo_postal_input");
const boton_crear_cuenta = document.getElementById("crear_cuenta");
boton_crear_cuenta.addEventListener("click", () => {
    let correo = correo_input.value;
    let contraseña = contraseña_input.value;
    console.log(correo);
});
//# sourceMappingURL=users.js.map