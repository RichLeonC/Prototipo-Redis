import { Search } from "redis-om";
import CarForm from "../lib/CarForm";
import SearchForm from "../lib/SearchForm"
export default function Home() {
  return (
    <div>
    
      <CarForm /> 
       <SearchForm/> 
    </div>
  )
    
  
}
