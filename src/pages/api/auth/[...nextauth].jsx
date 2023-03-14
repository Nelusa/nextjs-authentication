import { verifyPassword } from "@/helpers/auth";
import { connectToDatabase } from "@/helpers/db";
import NextAuth from "next-auth/next";
//import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  //session je objekt, ve kterém můžeme nakonfigurovat, jak se bude spravovat relace pro ověřeného uživatele
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // authorize je metoda, kterou NextJS zavolá, když obdrží příchozí požadavek na přihlášení
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user found!");
        }

        //máme hashované heslo --> bcryptjs má metodu compare, pomocí které toho můžeme dosáhnout (v souboru auth.js)

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }
        client.close();
        //pokud vrátíme objekt v authorize funkci, víme, že se přihlášení podařilo
        return {
          email: user.email, //vracíme pouze email, nechceme vrace i heslo
        };
      },
    }),
  ],
}); //musíme exportovat funkci
