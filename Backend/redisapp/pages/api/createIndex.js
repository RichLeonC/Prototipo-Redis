import { createIndex } from '../../lib/redis';

 export default async function handler(req, res) {  // creacion de otra ruta del api
   await createIndex();
   res.status(200).send('ok');
 }