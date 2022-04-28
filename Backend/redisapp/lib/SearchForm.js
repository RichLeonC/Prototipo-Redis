import { useState } from "react";

export default function CarForm() {

  const [hits, setHits] = useState([]);

  const search = async (event) => {

    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q })
      console.log("q: " + q);
      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      console.log(result)
      setHits(result['cars']);
    }
  }

  return (
    <div style={{ "position": "relative", "top": "3rem" }} className="container col-3">

      <h1>Busca tu carro favorito</h1>
      <input className="form-control" onChange={search} type="text" />
      <br />
      <ul>
        {hits.map((hit) => (
          <div className="container">
            <li  key={hit.entityId}>
              <div className="card" style={{"width": "18rem"}}>
                <img src={hit.image} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{hit.make} {hit.model}</h5>
                    <p className="card-text">{hit.description}</p>
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