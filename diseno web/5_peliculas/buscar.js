
let buscar = document.getElementById("buscar1");
let texto = document.getElementById("findmovieTitle");

movies = localStorage.getItem("movies");

let moviesArray = JSON.parse(movies);

buscar.addEventListener("click", function() {

    let findmovie = texto.value;
    
    
    crearCajas(findmovie);

    
    
    
});


    /*-let movies = localStorage.getItem("movies");-*/

function crearCajas(findmovie) {
    
    

    if (!movies) {
        alert("No existen películas en la base de datos.");
        return;
    }

    let codigohtml = "";
    let flag = false;

    moviesArray.forEach((element, i) => {
        if (findmovie==element.title){
        flag = true;
        codigohtml += `
            <div>
                <h1>Película #${i + 1}</h1>
                <p><strong>Título:</strong> ${element.title}</p>
                <p><strong>Género:</strong> ${element.genre}</p>
                <p><strong>Año:</strong> ${element.year}</p>
                <p><strong>Calificación:</strong> ${element.rating}</p>
            </div>
        `;
        }
        
    }
);

if(flag==false){
    alert("no se encontro pelicula");

}
    let cajaNotas = document.getElementById("movieList");
    if (cajaNotas) {
        cajaNotas.innerHTML = codigohtml;
    } else {
        console.error("El contenedor 'movieList' no existe en el DOM.");
    }
}
