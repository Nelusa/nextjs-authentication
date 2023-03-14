import { hashPassword, verifyPassword } from "@/helpers/auth";
import { connectToDatabase } from "@/helpers/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({
    req: req, //podívá se na příchozí požadavek a určí, zda obsahuje požadované údaje
  });

  //toto je klíčové ověření (celé autentizace), protože tady validujeme, zda je požadavek autentizován či nikoliv --> takto chráníme naše API routes přes nevyžádaným přístupem a každá API route, která provádí něco, co by mělo být povoleno pouze pro některé uživatele (tzn. ty ověřené), potřebuje tento typ ověření
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  //email dekódujeme v našem tokenu

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res
      .status(403)
      .json({ message: "You don't have a permission to do this operation!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashedPassword,
      },
    }
  ); //druhý argument je popis updatu

  client.close();
  res.status(200).json({ message: "Password updated!" });
}
