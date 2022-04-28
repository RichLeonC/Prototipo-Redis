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
  <div className="container">

    <h1>Busca tu carro favorito</h1>
    <input className="form-control" onChange={search} type="text" />
    <ul>
      {hits.map((hit) => (
        <li key={hit.entityId}>
          {hit.make} {hit.model}
        </li>
      ))}
    </ul>
  </div>
  );
}