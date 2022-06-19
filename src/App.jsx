import './App.css'

import {
  Routes,
  Route,
} from "react-router-dom";
import TableShow from "./Components/TableShow"
import Form from "./Components/Form"
import Resume from "./Components/Resume"
import ResumeShows from "./Components/ResumeShows"


function App() {

  return (
    <div className="App" >
     <Routes>
      
     <Route path="/add" element={<Resume/>}/>
     <Route path="/" element={<ResumeShows/>}/>
     {/* <Route path="/" element={<Form/>}/> */}

      {/* <Route path="/show" element={<TableShow/>}/> */}
     
    </Routes>
    </div>
  )
}

export default App
