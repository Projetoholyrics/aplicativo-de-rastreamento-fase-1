self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Service Worker ativo");
});
function pararRastreamento() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    statusTitle.textContent = "Rastreamento pausado";
    statusSub.textContent = "Localização não está sendo monitorada";
  }
}
latEl.textContent = lat.toFixed(6);
lonEl.textContent = lon.toFixed(6);
accEl.textContent = Math.round(acc);

localStorage.setItem("ultimaLocalizacao", JSON.stringify({ lat, lon, acc }));
const ultima = JSON.parse(localStorage.getItem("ultimaLocalizacao"));
if (ultima) {
  map.setView([ultima.lat, ultima.lon], 15);
}
const modo = document.getElementById("modoGPS").value;

const options = {
  enableHighAccuracy: modo === "alta",
  timeout: 10000,
  maximumAge: modo === "economia" ? 60000 : 0
};

localStorage.setItem("privacyAccepted", true);
const dddBrasil = {
  "11": { estado: "São Paulo", regiao: "Sudeste", lat: -23.55, lon: -46.63 },
  "21": { estado: "Rio de Janeiro", regiao: "Sudeste", lat: -22.90, lon: -43.17 },
  "31": { estado: "Minas Gerais", regiao: "Sudeste", lat: -19.91, lon: -43.94 },
  "41": { estado: "Paraná", regiao: "Sul", lat: -25.43, lon: -49.27 },
  "51": { estado: "Rio Grande do Sul", regiao: "Sul", lat: -30.03, lon: -51.23 },
  "61": { estado: "Distrito Federal", regiao: "Centro-Oeste", lat: -15.79, lon: -47.88 },
  "71": { estado: "Bahia", regiao: "Nordeste", lat: -12.97, lon: -38.50 },
  "81": { estado: "Pernambuco", regiao: "Nordeste", lat: -8.05, lon: -34.90 },
  "91": { estado: "Pará", regiao: "Norte", lat: -1.45, lon: -48.48 }
  // (podemos completar todos)
};
