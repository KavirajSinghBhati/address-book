import React from "react";
 
import { Route, Routes } from "react-router-dom";
 
import AddressList from "./components/addressList";
import Edit from "./components/edit";
import Create from "./components/create";
import "bootstrap/dist/css/bootstrap.css";
 
const App = () => {
 return (
   <div style={{margin: '10px', padding: '10px'}}>
    
     <Routes>
       <Route exact path="/" element={<AddressList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;