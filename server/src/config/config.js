import { MongoClient } from "mongodb";
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://ragaramadhannur2017:auM14BNUefXtvc8Q@databasemongodb.cof7z.mongodb.net/?retryWrites=true&w=majority&appName=databaseMongoDb";
export const client = new MongoClient(url);
// Database Name
export let db = null;

async function main() {
  // Use connect method to connect to the server

  if (!db) {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db("social_media");
  }
  //   const collection = db.collection("documents");

  // the following code examples can be pasted here...

  //   return "done.";
}

main().then(console.log).catch(console.error);
