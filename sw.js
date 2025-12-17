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
