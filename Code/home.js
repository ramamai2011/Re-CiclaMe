"use strict";

const datoshome = {
  usuario: "gordet",
  puntoCercano: "Belgrano",
  beneficios: "10% en COTO",
  historial: "botella de plástico - 10 puntos",
  puntos: 67

};

const recusuario = document.querySelector(".holausu");
recusuario.innerHTML = "<span class='textousuario'>hola, " + datoshome.usuario + "</span>" + "<span class= 'numeropuntos'> " datoshome.puntos
 