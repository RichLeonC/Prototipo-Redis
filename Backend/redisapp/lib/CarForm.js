import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function CarForm()  {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

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
        <div>
        <Form onSubmit={handleSubmit}>

            <FormGroup>
                <Label>Marca</Label> <br></br>
                <Input name="make" type="text" />
            </FormGroup>

            <br></br>

            <FormGroup>
                <Label>Modelo</Label> <br></br>
                <Input name="model" type="text" />
            </FormGroup>

            <br></br>

            <FormGroup>
                <Label>Imagen</Label> <br></br>
                <Input name="image" type="text" />
            </FormGroup>

            <br></br>

            <FormGroup>
                <Label>Descripción</Label> <br></br>
                <Input name="description" type="text" />
            </FormGroup>

            <br></br>

            <Button color='primary' type="submit">Crear Automovil</Button>
        </Form>
        </div>
    )
}