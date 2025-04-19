const inicio = document.getElementById("inicio");
const container = document.getElementById("container");
const play = document.getElementById("play");



const scoreText = document.getElementById("score");
const tiempo = document.getElementById("time");
const ratascount = document.getElementById("ratas");
const lose = document.getElementById("lose");
let ratasc=0;
let score=0;
let musicaInicio;

let segundos = 0;
let interval = 1500; 
let timeInterval;
let spawnInterval;  
let speedUpInterval;

let timec = 35;  
let timer;  

play.style.display = "none";

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


function stargame() { //inicia el juego

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
    //alert("generando rata");
    
    
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
        playExplosionSound(); 
        container.removeChild(rata);
        score += 100;
        ratasc -=1;
        playExplosionSound(); 
        scoreText.textContent = `Score: ${score}`;
        
        ratascount.textContent = `Ratas: ${ratasc}`;
    }); 

}






function endGame(){
    if(ratasc>=30){
        clearInterval(timer);

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