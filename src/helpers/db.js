import { MongoClient } from "mongodb";

//const oldString = `mongodb+srv://Nelusa:wyCPkcLwJpuHiXQr@cluster0.lk0nr4k.mongodb.net/my-blog?retryWrites=true&w=majority`;

//const newString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clusterName}.lk0nr4k.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://Nelusa:wyCPkcLwJpuHiXQr@cluster0.lk0nr4k.mongodb.net/auth-project?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function checkDuplicateUsers(client, collection, object) {
  const db = client.db();
  const result = await db.collection(collection).findOne(object);
  console.log(result);
  return result;
}

/* export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
} */
