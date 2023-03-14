import ProfileForm from "./ProfileForm";
import styles from "./UserProfile.module.css";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserProfile = () => {
  // Redirect away if NOT auth

  //KLIENTSKÁ AUTENTIZACE --> ZMĚNĚNO NA SSR AUTENTIZACI VE STRÁNCE PROFILE
  // tato komponenta se totiž vykreslí pouze v případě, že se vykreslí daná stránka, což zařizujeme přes getServerSideProps
  /*   const [isLoading, setIsLoading] = useState(true);
  //const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      //setLoadedSession(session)

      if (!session) {
        window.location.href = "/auth";
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  } */

  /*   const { data: session, status } = useSession();
  const loading = status === "loading";

  if (status === "loading") {
    return <p>Loading...</p>;
  } */

  const handleChangePassword = async (passwordData) => {
    const response = await fetch(`/api/user/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={handleChangePassword} />
    </section>
  );
};

export default UserProfile;
