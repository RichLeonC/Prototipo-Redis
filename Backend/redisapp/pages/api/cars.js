import { createCar } from '../../lib/redis';

export default async function handler(req, res) { //Función que recibe una petición y envía una respuesta
    const id = await createCar(req.body); //Recibe el objeto que se creó en el archivo CarForm
    res.status(200).json({ id }) //Envía como respuesta el ID del objeto enviado a la base de datos
} 