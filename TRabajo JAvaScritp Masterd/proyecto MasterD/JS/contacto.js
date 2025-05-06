document.addEventListener("DOMContentLoaded", () => {
    const destino = [40.39956, -3.68854]; 
    const map = L.map('map').setView(destino, 13);
  
    // Mapa base//
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    // Marcador destino
    L.marker(destino).addTo(map).bindPopup("Grupo Sinergia").openPopup();
  
    let control;
  
    document.getElementById('rutaForm').addEventListener('submit', function (e) {
      e.preventDefault();
  
      const direccion = document.getElementById('direccionCliente').value.trim();
  
      if (!direccion) {
        alert("Por favor ingresa una dirección.");
        return;
      }
  
      // Solicitar coordenadas //
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`, {
        headers: {
          "User-Agent": "GrupoSinergiaWeb/1.0 contacto@gruposinergia.com"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log("Respuesta Nominatim:", data);
  
        if (!data || !data[0]) {
          alert("Dirección no encontrada.");
          return;
        }
  
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
  
        // Validar coordenadas //
        if (isNaN(lat) || isNaN(lon)) {
          alert("Error: Coordenadas no válidas.");
          console.error("Coordenadas no válidas: ", data[0]);
          return;
        }
  
        if (control) map.removeControl(control);
  
        control = L.Routing.control({
          waypoints: [
            L.latLng(lat, lon),
            L.latLng(destino[0], destino[1])
          ],
          routeWhileDragging: false,
          createMarker: function(i, waypoint, n) {
            return L.marker(waypoint.latLng);
          }
        }).addTo(map);
  
      })
      .catch(err => {
        alert("Error al buscar la dirección.");
        console.error("Fetch error:", err);
      });
    });
  });
  

  // volver al inicio
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
