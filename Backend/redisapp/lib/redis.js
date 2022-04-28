import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();// Agregar un nuevo cliente a la base de datos

async function connect() {// abre la conexión con Redis; el link de conexión  se encuentra en el file llamado 
    if (!client.isOpen()) {// .env.local que contiene el identificador unico de la base en la nube , el puerto y el usuario 
        await client.open(process.env.REDIS_URL);
    }
}

class Car extends Entity {}
let schema = new Schema(// esquema del vehiculo que va a entrar en la base de datos 
  Car,
  {
    make: { type: 'text' },
    model: { type: 'text' },
    image: { type: 'string' },
    description: { type: 'string', textSearch: true },
    link : {type : 'string'}
  },
  {
    dataStructure: 'JSON',// la estructura que se guarda es un json para comprimir más los datos 
  }
);

export async function createCar(data) {
    await connect();//llamada a la función que hace la conexión 
  
    const repository = client.fetchRepository(schema) //  creación de un repositorio con el cliente y el esquema anteriormente definido
  
    const car = repository.createEntity(data); // objeto carro 
  
    const id = await repository.save(car); // creación del id unico del obejeto
    return id;
}

export async function createIndex() {
  await connect();

  const repository = new Repository(schema, client);
  await repository.createIndex()
}

export async function searchCars(q) {
  await connect();

  const repository = new Repository(schema, client);

  const cars = await repository.search()
    .where('make').eq(q)
    // .or('model').eq(q)
    // .or('description').matches(q)
    .return.all();
    
  return cars;
}