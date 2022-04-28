import { useState } from "react";

export default function CarForm() {  

  const [hits, setHits] = useState([]);   // useState para representar los resultados que se obtienen 

  const search = async (event) => {

    const q = event.target.value;

    if (q.length > 2) {   // este if previene llamadas excesivas al api
      const params = new URLSearchParams({ q })
      console.log("q: " + q);
      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      console.log(result)
      setHits(result['cars']);
    }
  }

  return (    // cuando se edita se activa la funcion que busca
  <div style={{"position":"relative","top":"3rem"}} className="container col-3">
 
    <h1>Busca tu carro favorito</h1>
    <input className="form-control" onChange={search} type="text" />
    <br/>
    <ul>
      {hits.map((hit) => (
        <div className="container">
        <li style={{"border":"solid"}} key={hit.entityId}>   {/* mapeo de cada hit a un list item */}
          <img src={hit.image} width="100"/>    {/* Despliegue de la imagen del carro guardada en la base de datos */}
          <h5 style={{"textAlign":"right"}}>{hit.make} {hit.model}</h5>   {/* Despliegue de los datos del carro */}
          <label style={{"textAlign":"right"}}>{hit.description}</label>
        </li>
        <br></br>
        </div>
      ))}
    </ul>

  </div>
  );
}