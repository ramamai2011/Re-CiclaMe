"use strict";

const datoshome = {
  usuario: "Gordet",
  puntoCercano: "Parque Saavedra",
  beneficios: "10% en COTO",
  historial: "botella de plástico - 10 puntos",
  puntos: 67,
  metros: 67,
  horario: "Abierto de 8 AM a 8 PM"
};

const recusuario = document.querySelector(".holausu");
recusuario.innerHTML = "<span class='textousuario'>¡Hola, " + datoshome.usuario + '!' + "</span>" +
 "<span class= 'numeropuntos'> " + datoshome.puntos + "</span>" +
 "<span class= 'puntospuntos'>Puntos " + "</span>" +
  "<span class= 'usubarra'></span>"

 
  const recpuntoverde = document.querySelector(".puntocercano")
  recpuntoverde.innerHTML = " <img src='../Assets/Assets/awards/6a620900f32618413220cc599df960da54dba604.png' alt='' class='imgmapa'>" +

   "<span class='puntoverdecercano'>Punto Verde Cercano </span>"  +
  "<span class='elpuntoverde'> <img src='../Assets/Assets/general/map pin.svg' alt='' class='imgpin'>" +
   datoshome.puntoCercano + "</span>" +
  "<span class='metros'>" + datoshome.metros + " Metros" + "</span>" +
  "<span class='horario'>" + datoshome.horario + "</span>" +
"<span class='verenelmapa'><span class='verenelmapatxt'>Ver en el mapa</span></span>"



 