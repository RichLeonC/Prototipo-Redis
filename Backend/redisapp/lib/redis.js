import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Car extends Entity {}
let schema = new Schema(
  Car,
  {
    make: { type: 'text' },
    model: { type: 'text' },
    image: { type: 'string' },
    description: { type: 'string', textSearch: true },
    link : {type : 'string'}
  },
  {
    dataStructure: 'JSON',
  }
);

export async function createCar(data) {
    await connect();
  
    const repository = client.fetchRepository(schema)
  
    const car = repository.createEntity(data);
  
    const id = await repository.save(car);
    return id;
}

export async function createIndex() {   //Funcion que referencia el repositorio y llama al metodo createIndex
  await connect();

  const repository = new Repository(schema, client);
  await repository.createIndex()
}

export async function searchCars(q) {   // funcion para buscar los carros en la base de datos
  await connect();                      // usa un query como input para usarlo como busqueda
                                        
  const repository = new Repository(schema, client);

  const cars = await repository.search()  // se llama al metodo search() del repositorio
    .where('make').eq(q)                  // el metodo where referencia propiedades del json (en este caso la marca)
    // .or('model').eq(q)                    y se compara con el query que pasa por parametro
    // .or('description').matches(q)
    .return.all();   // retorna todos los resultados que hacen match con el query 
    
  return cars;
}