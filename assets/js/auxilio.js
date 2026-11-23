/* =====================================================================
   Auxilio vial (auxilio.html)
   El cliente describe la falla, pide grúa u otra asistencia y comparte
   su ubicación (GPS o dirección). La solicitud se envía al WhatsApp
   del taller con un enlace al mapa.
   ===================================================================== */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var e = function (t) { return TY.escapar(t); };
  var TIPOS = {
    grua: "Grúa", bateria: "Batería / paso de corriente", llanta: "Llanta pinchada",
    mecanica: "Falla mecánica", electrica: "Falla eléctrica", otro: "Otro"
  };
  var coords = null;

  function msg(html, tipo) {
    $("auxilio-msg").innerHTML = html ? '<p class="mensaje mensaje--' + (tipo || "error") + '">' + html + "</p>" : "";
  }

  function mapaUrl() {
    return coords ? "https://maps.google.com/?q=" + coords.lat + "," + coords.lng : "";
  }

  function pedirUbicacion() {
    var b = $("btn-ubicacion"), est = $("ubicacion-estado");
    if (!navigator.geolocation) {
      est.textContent = "Tu navegador no permite compartir ubicación. Escribe la dirección o una referencia.";
      return;
    }
    b.disabled = true;
    est.textContent = "Obteniendo ubicación…";
    navigator.geolocation.getCurrentPosition(function (pos) {
      coords = { lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) };
      b.disabled = false;
      est.innerHTML = '✓ Ubicación lista · <a href="' + e(mapaUrl()) + '" target="_blank" rel="noopener">ver en el mapa</a>';
    }, function (err) {
      b.disabled = false;
      est.textContent = err && err.code === 1
        ? "Permiso denegado. Escribe la dirección o una referencia."
        : "No se pudo obtener la ubicación. Escribe la dirección o una referencia.";
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  }

  function enviar(ev) {
    ev.preventDefault();
    var f = ev.target;
    var tipo = f.querySelector('input[name="tipo"]:checked');
    var direccion = f.direccion.value.trim();
    var malo = null;

    var reglas = {
      nombre: function (v) { return v.length >= 3; },
      telefono: function (v) { return v.replace(/\D/g, "").length >= 7; },
      falla: function (v) { return v.length >= 5; }
    };
    Object.keys(reglas).forEach(function (k) {
      var ok = reglas[k](f[k].value.trim());
      f[k].setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !malo) malo = f[k];
    });
    if (!tipo) { msg("Elige qué necesitas: grúa, batería, llanta u otra asistencia."); return; }
    if (malo) { msg("Revisa los campos marcados en rojo."); malo.focus(); return; }
    if (!coords && direccion.length < 6) {
      msg("Comparte tu ubicación con el botón o escribe la dirección y una referencia.");
      $("aux-direccion").focus();
      return;
    }
    if (!f.acepto.checked) { msg("Debes aceptar la política de privacidad para enviar la solicitud."); return; }

    var lineas = [
      "🚨 AUXILIO VIAL — " + TY.negocio.nombre,
      "Tipo: " + (TIPOS[tipo.value] || tipo.value),
      "Nombre: " + f.nombre.value.trim(),
      "Teléfono: " + f.telefono.value.trim()
    ];
    if (f.vehiculo.value.trim()) lineas.push("Vehículo: " + f.vehiculo.value.trim());
    lineas.push("Qué pasó: " + f.falla.value.trim());
    if (coords) lineas.push("Ubicación GPS: " + mapaUrl());
    if (direccion) lineas.push("Dirección/referencia: " + direccion);
    var texto = lineas.join("\n");

    var wa = TY.enlaceWhatsApp(texto);
    if (wa) {
      window.open(wa, "_blank", "noopener");
      msg('✓ Solicitud lista. Se abrió WhatsApp para enviarla. Si no se abrió, <a href="' + e(wa) + '" target="_blank" rel="noopener">pulsa aquí para enviarla</a>.', "ok");
      return;
    }
    if (TY.negocio.correo) {
      location.href = "mailto:" + TY.negocio.correo + "?subject=" + encodeURIComponent("Auxilio vial: " + (TIPOS[tipo.value] || tipo.value)) + "&body=" + encodeURIComponent(texto);
      return;
    }
    msg("El taller aún no configura WhatsApp o correo. Llama directamente al taller.");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var f = $("form-auxilio");
    if (!f) return;

    var t = new URLSearchParams(location.search).get("tipo");
    if (t && TIPOS[t]) {
      var r = f.querySelector('input[name="tipo"][value="' + t + '"]');
      if (r) r.checked = true;
    }
    var d = TY.cliente.datos();
    if (d) {
      if (d.nombre) f.nombre.value = d.nombre;
      if (d.telefono) f.telefono.value = d.telefono;
    }

    $("btn-ubicacion").addEventListener("click", pedirUbicacion);
    f.addEventListener("submit", enviar);
    f.addEventListener("input", function (ev) { ev.target.removeAttribute("aria-invalid"); });
  });
})();