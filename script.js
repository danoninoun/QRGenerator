// Esperamos a que toda la página (HTML) esté cargada
document.addEventListener("DOMContentLoaded", () => {
    
    // "Pillamos" los elementos que necesitamos del HTML
    const boton = document.getElementById("generateBtn");
    const input = document.getElementById("urlInput");
    const contenedorQR = document.getElementById("qrcode");
    
    // Novedad: Pillamos el botón de descarga
    const downloadBtn = document.getElementById("downloadBtn");

    // Inicializamos el objeto QRCode
    const qr = new QRCode(contenedorQR, {
        width: 256, // Ajustado al tamaño del contenedor
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Función para generar el QR
    function generarCodigo() {
        const url = input.value; // Cogemos el texto del input

        if (!url) {
            alert("¡Pega una URL primero, compi!"); 
            input.focus();
            return;
        }
        
        // 1. Limpiamos el QR anterior y ocultamos el botón de descarga
        qr.clear();
        downloadBtn.style.display = 'none';

        // 2. Creamos el nuevo código QR
        qr.makeCode(url);

        console.log("QR generado para:", url);

        // 3. (IMPORTANTE) Esperamos un poquitín (50ms) a que la librería
        //    genere la etiqueta <img> del QR dentro del contenedor.
        //    No podemos coger la imagen en el mismo instante.
        setTimeout(() => {
            // Buscamos la imagen que la librería ha creado
            const img = contenedorQR.querySelector('img');
            
            if (img) {
                // Cogemos la fuente de la imagen (que es data:image/png;base64,...)
                const imgSrc = img.src;

                // 4. Configuramos el botón de descarga
                downloadBtn.href = imgSrc;
                
                // Creamos un nombre de archivo dinámico
                // (ej. "qr-google_com.png")
                const nombreArchivo = `qr-${url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
                downloadBtn.download = nombreArchivo;
                
                // 5. Mostramos el botón de descarga
                downloadBtn.style.display = 'block'; // Lo mostramos como bloque
            } else {
                console.error("No se pudo encontrar la imagen del QR.");
            }
        }, 50); // 50 milisegundos de espera
    }

    // "Escuchador" de evento para el clic en el botón
    boton.addEventListener("click", generarCodigo);

    // Generar también al pulsar "Enter"
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            generarCodigo();
        }
    });

});