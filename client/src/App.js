import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AddProd from "./components/AddProd";
import UpdateProd from './components/UpdateProd';
import AllProd from './components/AllProd';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<AllProd/>}/>
    <Route path='/add' element={<AddProd/>}/>
    <Route path='/update/:_id' element={<UpdateProd/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
