interface PuntoVerde {
  nombre: string;
  latitud: number;
  longitud: number;
  horario: string;
}

interface CoordenadasMapa {
  distanceTo(otra: CoordenadasMapa): number;
}

interface CapaLeaflet {
  addTo(destino: MapaLeaflet | GrupoLeaflet): CapaLeaflet;
  bindPopup(contenido: HTMLElement | string): CapaLeaflet;
  remove(): void;
}

interface MapaLeaflet {
  setView(centro: [number, number], zoom: number): MapaLeaflet;
}

interface GrupoLeaflet {
  addTo(mapa: MapaLeaflet): GrupoLeaflet;
  clearLayers(): void;
}

interface LeafletApi {
  latLng(latitud: number, longitud: number): CoordenadasMapa;
  map(elemento: HTMLElement): MapaLeaflet;
  layerGroup(): GrupoLeaflet;
  tileLayer(
    url: string,
    opciones: { maxZoom: number; attribution: string },
  ): { addTo(mapa: MapaLeaflet): void };
  circleMarker(
    coordenadas: [number, number],
    opciones: {
      radius: number;
      color: string;
      fillColor: string;
      fillOpacity: number;
      weight?: number;
    },
  ): CapaLeaflet;
}

declare const L: LeafletApi;

const datosHome = {
  usuario: "Usuario",
  puntos: 100,
  semana: 12,
};

const recuadroUsuario = document.querySelector<HTMLElement>(".holausu");
if (recuadroUsuario) {
  recuadroUsuario.innerHTML =
    `<span class="textousuario">¡Hola, ${datosHome.usuario}!</span>` +
    `<span class="numeropuntos">${datosHome.puntos}</span>` +
    `<span class="puntospuntos">Puntos </span>` +
    `<span class="usubarra"><svg class="flechausubarra" xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none"><path d="M9.5 19.5V1.5M17.5 9.375L9.5 1.5L1.5 9.375" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="cuantoestasemana">${datosHome.semana} ésta semana</span></span>`;
}

function obtenerElemento<T extends HTMLElement>(id: string): T {
  const elemento = document.getElementById(id);
  if (!elemento) {
    throw new Error(`No se encontró el elemento #${id}`);
  }
  return elemento as T;
}

const centroCaba: [number, number] = [-34.6037, -58.3816];
const referencia = L.latLng(centroCaba[0], centroCaba[1]);
const mapa = L.map(obtenerElemento("mapa-puntos-verdes")).setView(
  centroCaba,
  13,
);
const capaPuntos = L.layerGroup().addTo(mapa);
let marcadorUsuario: CapaLeaflet | undefined;
let puntosVerdes: PuntoVerde[] = [];

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mapa);

function mostrarPuntosCercanos(ubicacion: CoordenadasMapa): void {
  const cercanos = puntosVerdes
    .map((punto) => ({
      ...punto,
      distancia: ubicacion.distanceTo(
        L.latLng(punto.latitud, punto.longitud),
      ),
    }))
    .filter((punto) => punto.distancia <= 5000)
    .sort((a, b) => a.distancia - b.distancia);

  capaPuntos.clearLayers();
  cercanos.forEach((punto) => {
    const contenido = document.createElement("div");
    const nombre = document.createElement("strong");
    nombre.textContent = punto.nombre;
    const horario = document.createElement("div");
    horario.textContent = punto.horario || "Horario no informado";
    contenido.append(nombre, horario);

    L.circleMarker([punto.latitud, punto.longitud], {
      radius: 8,
      color: "#176b33",
      fillColor: "#64bd70",
      fillOpacity: 0.9,
    })
      .bindPopup(contenido)
      .addTo(capaPuntos);
  });

  const nombrePunto = obtenerElemento("nombre-punto-verde");
  const distanciaPunto = obtenerElemento("distancia-punto-verde");
  const horarioPunto = obtenerElemento("horario-punto-verde");
  const masCercano = cercanos[0];

  if (!masCercano) {
    nombrePunto.textContent = "No hay puntos verdes cargados cerca";
    distanciaPunto.textContent = "";
    horarioPunto.textContent = "";
    return;
  }

  nombrePunto.textContent = masCercano.nombre;
  distanciaPunto.textContent = `${Math.round(masCercano.distancia)} metros`;
  horarioPunto.textContent = masCercano.horario || "Horario no informado";
}

function convertirPunto(valor: unknown): PuntoVerde | undefined {
  if (typeof valor !== "object" || valor === null) return undefined;

  const datos = valor as Record<string, unknown>;
  const latitud = Number(datos.latitud);
  const longitud = Number(datos.longitud);
  if (
    typeof datos.nombre !== "string" ||
    !datos.nombre.trim() ||
    !Number.isFinite(latitud) ||
    !Number.isFinite(longitud)
  ) {
    return undefined;
  }

  return {
    nombre: datos.nombre.trim(),
    latitud,
    longitud,
    horario:
      typeof datos.horario === "string"
        ? datos.horario
        : "Horario no informado",
  };
}

async function cargarPuntosVerdes(): Promise<void> {
  try {
    const respuesta = await fetch("../../Code/puntos_verdes.json");
    if (!respuesta.ok) {
      throw new Error("No se pudo leer puntos_verdes.json");
    }

    const datos: unknown = await respuesta.json();
    puntosVerdes = Array.isArray(datos)
      ? datos
          .map(convertirPunto)
          .filter((punto): punto is PuntoVerde => punto !== undefined)
      : [];

    mostrarPuntosCercanos(referencia);
    usarMiUbicacion();
  } catch (error) {
    console.error("Error al cargar puntos verdes:", error);
    obtenerElemento("nombre-punto-verde").textContent =
      "No se pudieron cargar los puntos verdes";
  }
}

function usarMiUbicacion(): void {
  if (!navigator.geolocation) {
    obtenerElemento("distancia-punto-verde").textContent =
      "El navegador no permite compartir la ubicación.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const ubicacion: [number, number] = [
        coords.latitude,
        coords.longitude,
      ];
      mapa.setView(ubicacion, 15);
      marcadorUsuario?.remove();
      marcadorUsuario = L.circleMarker(ubicacion, {
        radius: 9,
        color: "#ffffff",
        weight: 3,
        fillColor: "#2878c8",
        fillOpacity: 1,
      })
        .bindPopup("Estás acá")
        .addTo(mapa);
      mostrarPuntosCercanos(L.latLng(coords.latitude, coords.longitude));
    },
    () => {
      obtenerElemento("distancia-punto-verde").textContent =
        "No se pudo acceder a la ubicación. El mapa sigue en CABA.";
    },
    { enableHighAccuracy: false, timeout: 10000 },
  );
}

obtenerElemento<HTMLButtonElement>("usar-ubicacion").addEventListener(
  "click",
  usarMiUbicacion,
);

void cargarPuntosVerdes();
