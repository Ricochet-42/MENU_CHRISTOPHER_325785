
cajaPrincipal=document.getElementById("rating")
for(let i=1; i<=10; i++){
    imagen=document.createElement("img");
    imagen.src="img/pavo (3).gif"
    cajaPrincipal.appendChild(imagen);
    imagen.classList.add("item");
    imagen.setAttribute("pos",i);
    
    imagen.setAttribute("val", 1);
    imagen.id="item-"+i;

    

    imagen.addEventListener("mouseover",
        function(){
            let posicion = parseInt(this.getAttribute("pos"));
            let val = parseInt(this.getAttribute("val"));

            if(val==1){
            for(let j=1;j<=posicion;j++){
                nuevo=document.getElementById("item-"+j);
                nuevo.src="img/pavo.gif"}
                this.setAttribute("val", 0); 
            }
            
            if(val==0){
            for(let j=10;j>=posicion;j--){
                nuevo=document.getElementById("item-"+j);
                nuevo.src="img/pavo (3).gif"}
                this.setAttribute("val", 1); 
            }
        }
    )

}