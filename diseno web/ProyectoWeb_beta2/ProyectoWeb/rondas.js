const inicio = document.getElementById("inicio");
const container = document.getElementById("container");
const play = document.getElementById("play");



const scoreText = document.getElementById("score");
const tiempo = document.getElementById("time");
const ratascount = document.getElementById("ratas");

let ratasc=0;
let score=0;
let musicaInicio;

let timec = 35;  // Tiempo inicial en segundosA
let timer;  // Guardará el intervalo del tiempo

play.style.display = "none";

window.onload = function()  {
    container.style.height = "80%";
    container.style.width = "90%";
    container.style.left = "5%";
    
    container.style.top = "6%";
    setTimeout(() => {
        
    play.style.display = "block";
    }, 1000);


};

function startTimer() {
    timec = 35; // Reinicia el tiempo
    tiempo.textContent = `Tiempo: ${timec}s`;

    timer = setInterval(() => {
        timec--;
        endGame();
        tiempo.textContent = `Tiempo: ${timec}s`;

        endGame();
    }, 1000);
}

play.addEventListener("click", function(){
    
    stargame();
    
    startTimer();
    play.style.display = "none";

})


function stargame() {
    musicaInicio = new Audio("img/music.m4a"); 
    musicaInicio.play();  // Reproduce la música
    musicaInicio.loop = true; // Hace que se repita en bucle


    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            crearchela();
        }, i * 6000);
    }

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            crearPizzaC();
            crearBomba();
        }, i * 3000);
    }


    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            crearPizza();
        }, i * 3000);
    }

    for (let i = 0; i < 9; i++) {
        setTimeout(() => {
            crearRata();
        }, i * 1000);
    }
    
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                crearRata();
            }, i * 500);
        }
    }, 5 * 1000); 
    
    setTimeout(() => {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                crearRata();
            }, i * 250);
        }
    }, (5 * 1000) + (10 * 500)); 
    
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                crearRata();
                crearRata();
            }, i * 500);
        }
    }, (5 * 1000) + (10 * 500) + (6 * 250)); 
    
    setTimeout(() => {
        for (let i = 0; i < 7; i++) {
            setTimeout(() => {
                crearRataGigante();
            }, i * 1000);
        }  
    }, (10 * 500)+(5 * 1000) + (10 * 500) + (6 * 250)); 
    

    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                crearRata();
                crearRata();
            }, i * 300);
        }
    }, (7*1000)+(10 * 500)+(5 * 1000) + (10 * 500) + (6 * 250)); 
    

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
        scoreText.textContent = `Score: ${score}`;
        
        ratascount.textContent = `Ratas: ${ratasc}`;
    }); 
}


function crearPizza() {
    //alert("generando rata");

    
    
    const pizza = document.createElement("img");
    pizza.src = "img/pizza.png"; 
    pizza.classList.add("pizza");
    
    const x = Math.random() * (container.offsetWidth - 70);
    const y = Math.random() * (container.offsetHeight - 70);
    pizza.style.left = `${x}px`;
    pizza.style.top = `${y}px`;
    container.appendChild(pizza);


    pizza.addEventListener("click", function() {

        container.removeChild(pizza);
        crearRata();
        crearRata();
        crearRata();
        crearRata();
    }); 
}


function crearPizzaC() {
    //alert("generando rata");
    const pizza = document.createElement("img");
    pizza.src = "img/pizzaC.png"; 
    pizza.classList.add("pizzaC");
    
    const x = Math.random() * (container.offsetWidth - 80);
    const y = Math.random() * (container.offsetHeight - 80);
    pizza.style.left = `${x}px`;
    pizza.style.top = `${y}px`;
    container.appendChild(pizza);


    pizza.addEventListener("click", function() {

        container.removeChild(pizza);
        
        crearPizza();
        crearPizza();
        crearPizza();
        crearPizza();
        crearPizza();
        crearPizza();
    }); 
}


function crearRataGigante() {
    //alert("generando rata");
    
    
    ratasc+=2;
    
    ratascount.textContent = `Ratas: ${ratasc}`;
    const ratag = document.createElement("img");
    ratag.src = "img/rata.png"; 
    ratag.classList.add("ratag");
    
    const x = Math.random() * (container.offsetWidth - 200);
    const y = Math.random() * (container.offsetHeight -200);
    ratag.style.left = `${x}px`;
    ratag.style.top = `${y}px`;
    container.appendChild(ratag);


    ratag.addEventListener("dblclick", function() {
        playExplosionSound(); 
        container.removeChild(ratag);
        score += 200;
        ratasc -=2;
        scoreText.textContent = `Score: ${score}`;
        ratascount.textContent = `Ratas: ${ratasc}`;
    });
    
}


function crearBomba() {
    const bomba = document.createElement("img");
    bomba.src = "img/bomba.png"; // Asegúrate de tener una imagen para la bomba
    bomba.classList.add("bomba");
    
    const x = Math.random() * (container.offsetWidth - 80);
    const y = Math.random() * (container.offsetHeight - 80);
    bomba.style.left = `${x}px`;
    bomba.style.top = `${y}px`;
    container.appendChild(bomba);

    bomba.addEventListener("click", function() {
        score += 250;
        scoreText.textContent = `Score: ${score}`;
        playExplosionSound(); 
        eliminarRatas(5); // Eliminar 4 ratas
        container.removeChild(bomba); // Eliminar la bomba después de hacer clic
    });
}



function crearchela() {
    const chela = document.createElement("img");
    chela.src = "img/chela.png"; 
    chela.classList.add("chela");
    
    const x = Math.random() * (container.offsetWidth - 80);
    const y = Math.random() * (container.offsetHeight - 80);
    chela.style.left = `${x}px`;
    chela.style.top = `${y}px`;
    container.appendChild(chela);

    chela.addEventListener("click", function() {
        eliminarPizzas();
        container.removeChild(chela);
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
        <p>Tiempo Jugado: ${35-timec} segundos</p>
        <p>Ratas Restantes: ${ratasc}</p>
        
        <h4>La pizzeria se infesto de ratas, nos superaron en numero y se apropiaron del lugar, ahora el restaurante se ke-ratas</h4>`;
        
        lose.style.display = "block"; 

        while (container.firstChild) {
            container.removeChild(contenedor.firstChild);
        }
    }
    if(timec <= 0){
        clearInterval(timer);

        if (musicaInicio) {
            musicaInicio.pause();
            musicaInicio.currentTime = 0; // Reiniciar el audio
        }

        
        lose.innerHTML = `
        <h1>FIN DEL JUEGO</h1>
        
        <h3>Estadísticas:</h3>
        <p>Score Final: ${score}</p>
        <p>Tiempo Jugado: ${35-timec} segundos</p>
        <p>Ratas Restantes: ${ratasc}</p>
        
        <h4>El tiempo ha terminado, ke-chelas no tardo en caer, las ratas ganaron</h4>`;
        lose.style.display = "block"; 

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
    if(ratasc==0 && timec < 10 ){
        clearInterval(timer);


        if (musicaInicio) {
            musicaInicio.pause();
            musicaInicio.currentTime = 0; // Reiniciar el audio
        }
        
        lose.innerHTML = `
        <h1>GANASTE</h1>
        <h3>Estadísticas:</h3>
        <p>Score Final: ${score}</p>
        <p>Tiempo Jugado: ${35-timec} segundos</p>
        
        <h4>Felicidades, acabaste con todas las ratas, ke-pizzas estara siempre en deuda contigo</h4>`;
        lose.style.display = "block"; // Mostrar pantalla de derrota
        let win = new Audio("img/win.m4a"); 
        win.play(); 
        container.style.backgroundColor="black";

        while (container.firstChild) {
            container.removeChild(contenedor.firstChild);
        }
    }
    if(score>8000){
        clearInterval(timer);


        if (musicaInicio) {
            musicaInicio.pause();
            musicaInicio.currentTime = 0; // Reiniciar el audio
        }
        
        lose.innerHTML = `
        <h1>Final Genocida</h1>
        <h3>Estadísticas:</h3>
        <p>Score Final: ${score}</p>
        <p>Tiempo Jugado: ${35-timec} segundos</p>
        <p>Ratas Restantes: ${ratasc}</p>
        <h4>Felicidades, mataste mas ratas de las contempladas, superaste el record, espero ahora estes feliz</h4>`;
        lose.style.display = "block"; // Mostrar pantalla de derrota
        
        let win = new Audio("img/win.m4a"); 
        win.play(); 
        container.style.backgroundColor="black";

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




function eliminarPizzas() {

    // Obtener todas las ratas visibles en el contenedor
    const pizza = document.querySelectorAll(".pizza");
    const pizzac = document.querySelectorAll(".pizzaC");

    

    // Eliminar hasta la cantidad especificada de ratas
    pizza.forEach((pizza) => {
            container.removeChild(pizza);
    });
    pizzac.forEach((pizzac) => {
        container.removeChild(pizzac);
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