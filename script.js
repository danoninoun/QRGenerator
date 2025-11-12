// Esperamos a que toda la página (HTML) esté cargada
// Esto asegura que los botones e inputs ya existen cuando el script se ejecuta
document.addEventListener("DOMContentLoaded", () => {
    
    // "Pillamos" los elementos que necesitamos del HTML
    const boton = document.getElementById("generarBtn");
    const input = document.getElementById("urlInput");
    const contenedorQR = document.getElementById("qrContenedor");

    // Inicializamos el objeto QRCode y le decimos dónde pintar (en "qrContenedor")
    // Lo creamos una sola vez
    // NOTA: "QRCode" existe gracias a la librería que cargamos en el HTML
    const qr = new QRCode(contenedorQR, {
        width: 234, // Lo hacemos un poco más pequeño que el contenedor (256 - 10 - 10)
        height: 234,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H // Alta corrección de errores
    });

    // Función para generar el QR
    function generarCodigo() {
        const url = input.value; // Cogemos el texto del input

        // Comprobamos si el input está vacío
        if (!url) {
            // Usamos alert() porque no nos queremos complicar con modales bonitos
            alert("¡Pega una URL primero, compi!"); 
            input.focus(); // Ponemos el foco en el input para que escriba
            return;
        }

        // Si ya había un QR, lo limpiamos
        qr.clear();
        // Creamos el nuevo código QR con la URL
        qr.makeCode(url);

        console.log("QR generado para:", url);
    }

    // "Escuchador" de evento para el clic en el botón
    boton.addEventListener("click", generarCodigo);

    // (Opcional) Generar también al pulsar "Enter" en el input
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            generarCodigo();
        }
    });

});