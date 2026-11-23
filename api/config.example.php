<?php
/* =====================================================================
   CONFIGURACIÓN PRIVADA DEL BACKEND
   ---------------------------------------------------------------------
   Este archivo NO es visible desde el navegador (lo protege .htaccess y,
   además, PHP nunca muestra su contenido). Aquí van las contraseñas y
   las llaves secretas. Nunca las pongas en assets/js/config.js.
   ===================================================================== */
return [

    // Acceso al panel admin.html: crean la cuenta la primera vez y también
    // permiten recuperar el acceso. En Render puedes sobrescribirlos con
    // las variables ADMIN_USUARIO y ADMIN_CLAVE.
    'admin_usuario' => getenv('ADMIN_USUARIO') ?: 'jhoel29',
    'admin_clave' => getenv('ADMIN_CLAVE') ?: '@13745460',

    // Zona horaria del taller: https://www.php.net/manual/es/timezones.america.php
    'zona_horaria' => 'America/La_Paz',

    // Datos para los correos (deben coincidir con assets/js/config.js).
    'negocio_nombre' => 'VOLTREX MOTORS',
    'correo_taller'  => getenv('CORREO_TALLER') ?: '',                        // Recibe una copia de cada reserva y mensaje
    'correo_remitente' => getenv('CORREO_REMITENTE') ?: '',                      // Ej.: no-responder@tudominio.com (debe ser de TU dominio)
    'sitio_url'      => getenv('SITIO_URL') ?: '',                        // Ej.: https://www.tudominio.com (sin / final)

    // Moneda y país para dLocal Go (código ISO de 2 letras del país).
    'moneda' => 'BOB',
    'pais'   => 'BO',

    /* ---------- dLocal Go (opción B: checkout automático) ----------
       Obtén tus llaves en el panel de dLocal Go > Integraciones > API.
       Deja 'sandbox' => true para pruebas y cámbialo a false en producción.
       Si las llaves están vacías se usa DLOCAL_PAYMENT_URL de config.js. */
    'dlocal_api_key'    => getenv('DLOCAL_API_KEY') ?: '',
    'dlocal_secret_key' => getenv('DLOCAL_SECRET_KEY') ?: '',
    'dlocal_sandbox'    => getenv('DLOCAL_SANDBOX') !== 'false',
];
