import UserProfile from "@/components/profile/UserProfile";
import { getSession } from "next-auth/react";

const ProfilePage = () => {
  return <UserProfile />;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); //funkce přijímá objekt s klíčem req a vlastnost context.req, protože v getServerSideProps máme přístup o objektu požadavku skrze context --> getSession se podívá na tento požadavek a získá potřebná data (konkrétně cookie tokenu daného sessionu), a zjistí, zda je platný, zda cookie vůbec existuje apod.
  //session bude null, pokud uživatel nebude autentizovaný, a pokud naopak je, session bude platný objekt

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false, // nejedná se o permanentní přesměrování
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
}

export default ProfilePage;
