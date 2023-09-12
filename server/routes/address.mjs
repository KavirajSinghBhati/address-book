import express from "express";
import db from "../db/db.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

/*
The below given code 
gets the list of all addresses 
stored in our db
*/

router.get("/", async(req, res) => {
    let collection = await db.collection("addresses");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

/*
The below given code 
gets a single address,
given the id
*/

router.get("/:id", async (req, res) => {
    let collection = await db.collection("addresses");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Address not found").status(404);
    else res.send(result).status(200);
});

/*
The below given code 
creates an address and 
adds the address to our database
*/

router.post("/", async (req, res) => {
    let doc = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    };
    let collection = await db.collection("addresses");
    let result = await collection.insertOne(doc);
    res.send(result).status(204);
});

/*
The below given code 
edits an address and 
updates the address in our database
*/

router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updateDoc =  {
      $set: {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
      }
    };
  
    let collection = await db.collection("addresses");
    let result = await collection.updateOne(query, updateDoc);
    res.send(result).status(200);
});

/*
The below given code 
deletes an address 
from our database
*/

router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("addresses");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
});
  
export default router;