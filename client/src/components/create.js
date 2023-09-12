import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   address: "",
   phone: "",
 });
 const navigate = useNavigate();
 

 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 

 async function onSubmit(e) {
   e.preventDefault();
 
   const newPerson = { ...form };

   if(newPerson.name === "") {
    alert('Please enter name to save address!');
    return;
   }
 
   await fetch("http://localhost:5050/address", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", address: "", phone: "" });
   navigate("/");
 }
 
 return (
   <div>
     <h3 className="text-success">Add New Address</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label className="text-success" htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label className="text-success" htmlFor="address">Address</label>
         <input
           type="text"
           className="form-control"
           id="address"
           value={form.address}
           onChange={(e) => updateForm({ address: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label className="text-success" htmlFor="phone">Phone</label>
         <input
           type="text"
           className="form-control"
           id="phone"
           value={form.phone}
           onChange={(e) => updateForm({ phone: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create address"
           className="btn btn-success"
         />
       </div>
     </form>
   </div>
 );
}