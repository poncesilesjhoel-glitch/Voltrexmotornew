/* =====================================================================
   CONFIGURACIÓN GENERAL DEL SITIO
   ---------------------------------------------------------------------
   Edita SOLO este archivo para poner los datos reales de tu negocio.
   Todos los textos del sitio (menú, pie de página, páginas legales,
   contacto, reservas) se completan automáticamente con estos valores.

   IMPORTANTE: los campos vacíos ("") se ocultan en el sitio. Antes de
   publicar, completa TODOS los campos de "negocio". El panel admin.html
   te muestra una lista de los que faltan.
   ===================================================================== */
window.TALLER_CONFIG = {

  /* ---------- 1. Identidad del negocio ---------- */
  negocio: {
    nombre: "NITROX",            // Nombre comercial
    titular: "Jhoel Ponce",                   // Nombre completo del titular o razón social
    nit: "13745460",                       // NIT / RUC / identificación comercial
    pais: "Bolivia",               // País
    ciudad: "Cochabamba",                    // Ej.: "Medellín"
    direccion: "Villa Candelaria, calle 6 y calle 5, zona norte",                 // Dirección física del taller
    correo: "j2930741@gmail.com",                    // Correo de contacto (también recibe las reservas)
    whatsapp: "59174657211",                  // Solo números con código de país. Ej.: "59170000000"
    horarioTexto: "Lunes a viernes, de 8:00 a 17:00",
    dominio: "https://nitrox.poncesiles.com"                 // Ej.: "https://www.tutaller.com" (para enlaces en correos)
  },

  /* ---------- 2. Moneda y formato ---------- */
  moneda: "BOB",                   // Bolivianos (Bs)
  locale: "es-BO",                 // Formato de números de Bolivia

  /* ---------- 3. Pagos con dLocal Go ----------
     Opción A (más simple): crea un "Link de pago" en tu panel de dLocal Go
     y pégalo aquí. El cliente abrirá ese enlace al pulsar "Pagar adelanto".
     Opción B (recomendada): configura tus llaves en api/config.php; el
     sitio creará un checkout con el monto exacto de cada reserva.
     Si la opción B está configurada, tiene prioridad sobre esta URL. */
  DLOCAL_PAYMENT_URL: "",

  /* ---------- 4. Backend ----------
     Carpeta del backend PHP (guarda reservas y envía correos).
     Si tu hosting no tiene PHP, deja API_URL en "" y el sitio funcionará
     en "modo local": las reservas se guardan en el navegador y se envían
     al taller por WhatsApp (ver README). */
  API_URL: "api/",

  /* Huella SHA-256 de la contraseña inicial del panel (la que está en
     api/config.php). El panel con backend usa usuario y contraseña;
     esta huella solo queda como referencia para el modo sin backend. */
  ADMIN_PASSWORD_SHA256: "8151b091bad3520e4d2237e6d390ae7132855a385c101eaf8d583b9b24d9ded4"
};
