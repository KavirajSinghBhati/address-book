import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Address = (props) => (
 <tr>
   <td className="text-success">{props.address.name}</td>
   <td className="text-success">{props.address.address}</td>
   <td className="text-success">{props.address.phone}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.address._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteAddress(props.address._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function AddressList() {
 const [addresses, setAddresses] = useState([]);
 
 useEffect(() => {
   async function getAddresses() {
     const response = await fetch(`http://localhost:5050/address/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setAddresses(records);
   }
 
   getAddresses();
 
   return;
 }, [addresses.length]);
 

 async function deleteAddress(id) {
   await fetch(`http://localhost:5050/address/${id}`, {
     method: "DELETE"
   });
 
   const newAddresses = addresses.filter((el) => el._id !== id);
   setAddresses(newAddresses);
 }
 
 function addressList() {
   return addresses.map((address) => {
     return (
       <Address
         address={address}
         deleteAddress={() => deleteAddress(address._id)}
         key={address._id}
       />
     );
   });
 }
 

 return (
   <div>
     <h3 className="text-success">Address List</h3>
     <Link className="btn btn-success" to="/create">Create</Link>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th className="text-success">Name</th>
           <th className="text-success">Address</th>
           <th className="text-success">Phone</th>
           <th className="text-success">Action</th>
         </tr>
       </thead>
       <tbody>{addressList()}</tbody>
     </table>
   </div>
 );
}