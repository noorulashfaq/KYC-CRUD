import {BrowserRouter,Routes,Route} from "react-router-dom"
import Add from "./components/Adduser"
import Update from "./components/Updateuser"
import Delete from "./components/Deleteuser"
import List from "./components/Listuser"

const App=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<List/>}/>
                <Route path="/add" element={<Add/>}/>
                <Route path="/update" element={<Update/>}/>
                <Route path="/delete" element={<Delete/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App