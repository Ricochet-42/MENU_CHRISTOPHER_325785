document.addEventListener('DOMContentLoaded', () => {
    const opciones = document.querySelectorAll('.dos'); // Seleccionamos todas las imágenes
    const rdos = document.getElementById('rdos');
    const rtres = document.getElementById('rtres');

    opciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            // Cambiar la imagen en #rdos
            const nuevaImagen = opcion.getAttribute('data-img');
            rdos.innerHTML = `<img src="${nuevaImagen}" alt="Imagen seleccionada">`;

            // Cambiar el texto en #rtres
            const nuevoTexto = opcion.getAttribute('data-text');
            rtres.textContent = nuevoTexto;
        });
    });
});
