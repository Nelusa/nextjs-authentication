import { hashPassword } from "@/helpers/auth";
import {
  checkDuplicateUsers,
  connectToDatabase,
  insertDocument,
} from "@/helpers/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;

    let client;

    if (!email || !email.includes("@") || !password || password.trim() < 7) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newRegistration = {
      email: email,
      password: hashedPassword,
    };

    let result;

    try {
      result = await insertDocument(client, "users", newRegistration);
      newRegistration.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "User created!",
      registration: newRegistration,
    });

    return;
  }
}
