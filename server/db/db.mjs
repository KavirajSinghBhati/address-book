import { MongoClient } from "mongodb";

const connUri = process.env.DB_URI || "";

const mongoClient = new MongoClient(connUri);

let conn;
try {
  conn = await mongoClient.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("address");

export default db;