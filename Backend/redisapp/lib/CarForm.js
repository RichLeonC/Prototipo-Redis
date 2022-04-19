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
        <form onSubmit={handleSubmit}>
        <h3>Marca</h3>
          <input name="make" type="text"  /* Introduce la marca del vehículo*//> 
          <br></br>
        <h3>Modelo</h3>
          <input name="model" type="text" /* Introduce el modelo del vehículo*/ />
          <br></br>
        <h3>Imagen</h3>
          <input name="image" type="text"  /* Introduce una imagen del vehículo*/ />
          <br></br>
        <h3>Descripción</h3>
          <textarea name="description" type="text"  /* Introduce una descripción del vehículo*/ />
          <br></br>
          <button type="submit">Ingresar Automovil </button> 
        </form>
      );
}