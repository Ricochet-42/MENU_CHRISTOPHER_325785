preguntas=[];
indice=0;
count=0;
flag=0;
datos();
async function datos(){
    try{
        preguntasjson=await fetch("preguntas.json");
        preguntas=await preguntasjson.json();
        mostrarpregunta();
    } catch(error){
        alert("error");
    }
}

function mostrarpregunta(){
    document.getElementById("pregunta").textContent=preguntas[indice].pregunta;

    cajaop=document.getElementById("opciones");

    preguntas[indice].opciones.forEach(op => {
        let boton=document.createElement("button");
        boton.textContent=op;
        cajaop.appendChild(boton);
        

        boton.addEventListener("click", function(){
            if(op==preguntas[indice].respuesta){
                count+=1;
                boton.style.backgroundColor="green";
                setTimeout(() => {
                siguientepregunta();
                }, 1000);
            }else{
                boton.style.backgroundColor="red";
                setTimeout(() => {
                siguientepregunta();
                }, 1000);
            }

        })

    });

}

siguiente=document.getElementById("siguiente");
siguiente.addEventListener("click", siguientepregunta);

function siguientepregunta(){

    cajaop.innerHTML="";
    indice+=1;
    document.getElementById("puntuacion").textContent = "Puntuación: " + count;       

    

    mostrarpregunta();


}
