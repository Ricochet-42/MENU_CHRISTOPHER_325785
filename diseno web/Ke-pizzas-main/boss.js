const inicio = document.getElementById("inicio");
const container = document.getElementById("container");
const play = document.getElementById("play");



const scoreText = document.getElementById("score");
const tiempo = document.getElementById("time");
const ratascount = document.getElementById("ratas");
const lose = document.getElementById("lose");
const win1 = document.getElementById("win");

let ratasc=0;
let score=0;
let musicaInicio;
let segundos = 0;
let interval = 2000; 
let timeInterval;
let spawnInterval;  
let speedUpInterval;

let fin = false;

let timec = 35;  
let timer;  
let click = 150;
play.style.display = "none";

const jefe = document.getElementById("jefe");
const jefeCount = document.createElement("div");
jefeCount.textContent = "Faltan: 150";
jefeCount.classList.add("contador");
jefe.appendChild(jefeCount);

window.onload = function()  {
    container.style.height = "80%";
    container.style.width = "90%";
    container.style.left = "5%";
    
    container.style.top = "6%";
    setTimeout(() => {
        
    play.style.display = "block"; //boton play aparece, inicia stargame y timer
    }, 1000);


};
play.addEventListener("click", function(){
    play.style.display = "none";
    stargame();
    startTimer();

})

function moverJefeAleatoriamente() {
    // Calculamos posiciones aleatorias dentro de los límites del div de juego
    const maxX = container.offsetWidth - jefe.offsetWidth; // Maximo en X (ancho del área - ancho del jefe)
    const maxY = container.offsetHeight - jefe.offsetHeight; // Maximo en Y (alto del área - alto del jefe)

    const x = Math.random() * maxX; // Coordenada X aleatoria
    const y = Math.random() * maxY; // Coordenada Y aleatoria

    // Aplicamos la nueva posición al jefe
    jefe.style.left = `${x}px`;
    jefe.style.top = `${y}px`;
}

// Función para empezar el movimiento del jefe
function startMovement() {
    movementInterval = setInterval(moverJefeAleatoriamente, 2000);  
}

function stargame() { 
    jefe.style.display = "block";  
    jefe.removeEventListener("click", contarClickJefe);  
    jefe.addEventListener("click", contarClickJefe);
    startMovement();

    //musica
    musicaInicio = new Audio("img/music.m4a"); 
    musicaInicio.play();  
    musicaInicio.loop = true; 


    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            crearRata();
        }, i * 1000);
    }

    spawnInterval = setInterval(spawnRata, interval); 
    timeInterval = setInterval(function() {
        segundos++;
        tiempo.textContent = `Tiempo: ${segundos}s`; 
    }, 1000);

    speedUpInterval = setInterval(function() {
        if (interval > 300) { 
            interval = interval * .8; 
            clearInterval(spawnInterval); 
            spawnInterval = setInterval(spawnRata, interval); 
        }
    }, 3000); 
    

}


function spawnRata() {
    
    if (lose.style.display === "block") return; 
    crearRata();
    endGame(); 
}

function crearRata() {
    if (fin) return;
    ratasc+=1;
    ratascount.textContent = `Ratas: ${ratasc}`;
    const rata = document.createElement("img");
    rata.src = "img/rata.png"; 
    rata.classList.add("rata");
    
    const x = Math.random() * (container.offsetWidth - 80);
    const y = Math.random() * (container.offsetHeight - 80);
    rata.style.left = `${x}px`;
    rata.style.top = `${y}px`;
    container.appendChild(rata);


    rata.addEventListener("click", function() {
        if (fin) return;
        playExplosionSound(); 
        container.removeChild(rata);
        score += 100;
        ratasc -=1;
        playExplosionSound(); 
        scoreText.textContent = `Score: ${score}`;
        
        ratascount.textContent = `Ratas: ${ratasc}`;
    }); 

}

function contarClickJefe() {
    if (fin) return; 
    click--;
    jefeCount.textContent = `Faltan: ${click}`;
    endGame(); 
}

function endGame(){
    if(ratasc>=30){
        clearInterval(timeInterval); 
        clearInterval(spawnInterval);
        fin = true;

        container.style.backgroundColor="rgba(132, 15, 15, 0.98)";
        if (musicaInicio) {
            musicaInicio.pause();
            musicaInicio.currentTime = 0; // Reiniciar el audio
        }


        let win = new Audio("img/win.m4a"); 
        win.play(); 

        lose.innerHTML = `
        <h1>FIN DEL JUEGO</h1>
        
        <h3>Estadísticas:</h3>
        <p>Score Final: ${score}</p>
        <p>Tiempo Jugado: ${segundos} segundos</p>
        <h4>La pizzeria se infesto de ratas, nos superaron en numero y se apropiaron del lugar, ahora el restaurante se llama ke-ratas</h4>`;
        
        lose.style.display = "block"; 

        while (container.firstChild) {
            container.removeChild(contenedor.firstChild);
        }
    
    }

    else if(click == 0){
        fin = true;
        clearInterval(timeInterval);
        clearInterval(spawnInterval); 

        container.style.backgroundColor="rgba(132, 15, 15, 0.98)";
        if (musicaInicio) {
            musicaInicio.pause();
            musicaInicio.currentTime = 0; // Reiniciar el audio
        }


        let win = new Audio("img/win.m4a"); 
        win.play(); 

        win1.innerHTML = `
        <h1>FIN DEL JUEGO, ¡HAS GANADO!</h1>
        
        <h3>Estadísticas:</h3>
        <p>Score Final: ${score}</p>
        <p>Tiempo Jugado: ${segundos} segundos</p>
        <h4>La pizzeria no se infesto de ratas, ahora el restaurante ke-pizzas esta en deuda contigo</h4>`;
        
        win1.style.display = "block"; 

        while (container.firstChild) {
            container.removeChild(contenedor.firstChild);
        }
    
    }
}



function eliminarRatas(cantidad) {
    let ratasEliminadas = 0;

    // Obtener todas las ratas visibles en el contenedor
    const ratas = document.querySelectorAll(".rata");

    // Eliminar hasta la cantidad especificada de ratas
    ratas.forEach((rata) => {
        if (ratasEliminadas < cantidad) {
            container.removeChild(rata);
            ratasEliminadas++;
            ratasc--; // Decrementar el contador de ratas
            ratascount.textContent = `Ratas: ${ratasc}`;
        }
    });
}




function reiniciarJuego() {
    location.reload(); // Recarga la página completamente
}



function playExplosionSound() {
    let explosion = new Audio("img/videoplayback.m4a"); // Ruta del sonido
    explosion.play(); // Reproduce el sonido
}


function toggleContenedor() {
    let contenedor = document.getElementById("infor");
    
    // Alternar entre display "block" y "none"
    if (contenedor.style.display === "none" || contenedor.style.display === "") {
        contenedor.style.display = "block";
    } else {
        contenedor.style.display = "none";
    }
}