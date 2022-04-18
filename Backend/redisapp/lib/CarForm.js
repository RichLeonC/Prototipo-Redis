import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function CarForm()  {

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());
    
        const res = await fetch('/api/cars', {
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
    
        const result = await res.json();
        console.log(result)
      };

      return (
        <form onSubmit={handleSubmit}>
        <h3>Marca</h3>
          <input name="make" type="text"  />
          <br></br>
        <h3>Modelo</h3>
          <input name="model" type="text"  />
          <br></br>
        <h3>Imagen</h3>
          <input name="image" type="text"  />
          <br></br>
        <h3>Descripción</h3>
          <textarea name="description" type="text"  />
          <br></br>
          <button type="submit">Ingresar Automovil</button>
        </form>
      );
}