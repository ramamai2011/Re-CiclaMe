"use strict";

const datoshome = {
  usuario: "gordet",
  puntoCercano: "Belgrano",
  beneficios: "10% en COTO",
  historial: "botella de plástico - 10 puntos"

};

const recusuario = document.querySelector(".holausu");
recusuario.innerHTML = "hola, <span class='textousuario'>" + datoshome.usuario + "</span>";