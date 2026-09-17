"use strict";

const datoshome = {
  usuario: "Gordet",
  puntoCercano: "Parque Saavedra",
  beneficios: "10% en COTO",
  historial: "botella de plástico - 10 puntos",
  puntos: 67,
  metros: 67,
  horario: "Abierto de 8 AM a 8 PM",
  semana: + 12
};

const recusuario = document.querySelector(".holausu");
recusuario.innerHTML = "<span class='textousuario'>¡Hola, " + datoshome.usuario + '!' + "</span>" +
 "<span class= 'numeropuntos'> " + datoshome.puntos + "</span>" +
 "<span class= 'puntospuntos'>Puntos " + "</span>" +
  "<span class= 'usubarra'> " + `<svg class= 'flechausubarra' xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none">
  <path d="M9.5 19.5V1.5M17.5 9.375L9.5 1.5L1.5 9.375" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>` +   "<span class='cuantoestasemana'>" + datoshome.semana + " ésta semana</span>" +
"</span>";

 
  const recpuntoverde = document.querySelector(".puntocercano")
  recpuntoverde.innerHTML = " <img src='../Assets/Assets/awards/6a620900f32618413220cc599df960da54dba604.png' alt='' class='imgmapa'>" +

   "<span class='puntoverdecercano'>Punto Verde Cercano </span>"  +
  "<span class='elpuntoverde'> " + `<svg class = 'imgpin' xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none'>
  <path d='M18 19.5C20.4853 19.5 22.5 17.4853 22.5 15C22.5 12.5147 20.4853 10.5 18 10.5C15.5147 10.5 13.5 12.5147 13.5 15C13.5 17.4853 15.5147 19.5 18 19.5Z' stroke='#1F8527' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/>
  <path d='M9.51472 6.51472C11.7652 4.26428 14.8174 3 18 3C21.1826 3 24.2348 4.26428 26.4853 6.51472C28.7357 8.76516 30 11.8174 30 15C30 17.838 29.397 19.695 27.75 21.75L18 33L8.25 21.75C6.603 19.695 6 17.838 6 15C6 11.8174 7.26428 8.76516 9.51472 6.51472Z' stroke='#1F8527' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/>
</svg>` +
   datoshome.puntoCercano + "</span>" +
  "<span class='metros'>" + datoshome.metros + " Metros" + "</span>" +
  "<span class='horario'>" + datoshome.horario + "</span>" +
"<span class='verenelmapa'><span class='verenelmapatxt'>Ver en el mapa</span></span>"