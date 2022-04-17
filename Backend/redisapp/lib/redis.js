import { Client, Entity, Schema, Repository } from "redis-om";

const client= new Client(); //Creamos un cliente para redis

async function connect (){  //Conectamos con redis
    if (!client.isOpen){
        await client.open(process.env.REDIS_URL); //Usamos la URL de la conexion
    }
}

class Car extends Entity{} //Creamos la entidad Car
let schema = new Schema( //Estructura del carro
    Car, {
        make: {type: 'string' },
        model: {type: 'string' },
        image: {type: 'string'},
        description: {type: 'string'},

    },
    {
        dataStructure: 'JSON',
    }


);

export async function createCar(data){  //Creaction del carro
    await connect(); //Conexion a REDIS

    const repository = new Repository(schema, client); //Guardamos el schema en el redis
    const car = repository.createEntity(data); //Creamos una entidad del carro
    const id = await repository.save(car); //guardamos el car
    return id; //retornamos el id del car
}