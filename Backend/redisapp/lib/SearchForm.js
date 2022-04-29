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
    <div style={{ "position":"absolute", "right":"350px", "top":"50px"}} className="container col-3">

      <h1>Busca tu carro favorito</h1>
      <input className="form-control" onChange={search} type="text" />
      <br />
      <ul>
        {hits.map((hit) => (
          <div className="container">
            <li key={hit.entityId}>   {/* mapeo de cada hit a un list item */}
              <div className="card" style={{"width": "18rem"}}>
                <img src={hit.image} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{hit.make} {hit.model}</h5>
                    <p className="card-text">{hit.description}</p>
                    <a href={hit.link}className="card-text">Comprar</a>
                    
                  </div>
              </div>
            </li>
            <br></br>
          </div>
        ))}
      </ul>
    </div>
  );
}