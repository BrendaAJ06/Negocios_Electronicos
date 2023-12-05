function agregar(name,plantilla,imagen,precio,desc){
    nombre = name;
    description = desc;
    image = imagen;
    price = precio;
    plant = plantilla;

  
    let prod={
        nombre,
        description,
        image,
        price,
        plantilla
    }

    if (localStorage.getItem("Lista")==null) {
        let prods = []
        prods.push(prod)
        localStorage.setItem("Lista", JSON.stringify(prods))
    }else{
        let prods = JSON.parse(localStorage.getItem("Lista"))
        prods.push(prod)
        localStorage.setItem("Lista", JSON.stringify(prods))
    }
}

function mostrar(){
    let productos = JSON.parse(localStorage.getItem("Lista"));
    document.getElementById("dump").innerHTML=""
    for(let i=0; i<productos.length;i++){
        let nombre = productos[i].nombre
        let precio = productos[i].price
        let description = productos[i].description
        let imagen = productos[i].image
        let plant = productos[i].plantilla

        document.getElementById("dump").innerHTML+= 
       `<div class="card mb-3 border-warning" style="max-width: 540px;">
       <div class="row g-0">
         <div class="col-md-4">
           <a href="${plant}"><img src="https://${imagen}" class="img-fluid rounded-start" alt="..."></a>
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${nombre}</h5>
             <p class="card-text">${description}</p>
             <p class="card-text"><small class="text-muted">$${precio}</small></p>
             <button class="btn btn-outline-danger" onclick="eliminar('${nombre}')">Elimnar</button>
           </div>
         </div>
       </div>
     </div>`
    }
}

function eliminar(nombre){
    let productos = JSON.parse(localStorage.getItem("Lista"));
    for (let i=0;i<productos.length;i++){
        if (productos[i].nombre===nombre) {
            productos.splice(i,1);
        }
    }
    localStorage.setItem("Lista",JSON.stringify(productos));
    mostrar();
}

mostrar()