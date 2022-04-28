



export default function CarForm()  { // Función que genera un automovil en la base de datos

    const handleSubmit = async (event) => { //Constante que envía el objeto al archivo cars.js
        event.preventDefault(); //Previene errores que puedan surgir en el proceso de enviado
    
        const form = new FormData(event.target); //Transforma los inputs del usuario en un Form
        const formData = Object.fromEntries(form.entries()); //Convierte el Form previamente creado en un objeto listo para enviarse
    
        const res = await fetch('/api/cars', { //Proceso de enviado a cars.js
          body: JSON.stringify(formData), //Se envía en objeto en formato JSON
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
    
        const result = await res.json(); //Se guarda el resultado del envío
        console.log(result) //Se imprime en consola
      };

      return (
       
        <form onSubmit={handleSubmit} className = "container col-3" >
        <h1  >Ingrese un vehículo</h1>
        <h4 >Marca</h4>
        <input className = "form-control " name="make" type="text"  placeholder="Ingrese Marca"/* Introduce la marca del vehículo*//>  
          <br></br>
        <h4>Modelo</h4>
          <input className = "form-control " name="model" type="text" placeholder="Ingrese Modelo" /* Introduce el modelo del vehículo*/ />
          <br></br>
        <h4>Imagen</h4>
          <input className = "form-control " name="image" type="text" placeholder="Ingrese URL en jpg " /* Introduce una imagen del vehículo*/ />
          <br></br>
        <h4>Descripción</h4>
          <textarea className = "form-control " name="description" type="text" placeholder="Ingrese Información extra" /* Introduce una descripción del vehículo*/ />
          <br></br>
          <button type="submit"  class="btn btn-info" >Ingresar Automovil </button> 
         
        </form>
        
     
      );
}