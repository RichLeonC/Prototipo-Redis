import { Search } from "redis-om";
import CarForm from "../lib/CarForm";

export default function Home() {
  return (
    <div>
     <h1>Ingrese un Vehículo</h1>
      <CarForm /> 
    </div>
  )
    
  
}
