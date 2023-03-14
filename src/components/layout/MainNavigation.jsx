import Link from "next/link";
import styles from "./MainNavigation.module.css";
import { useSession, signOut } from "next-auth/react";

const MainNavigation = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log(loading);
  console.log(session);
  console.log(status);

  const handleLogout = () => {
    signOut(); //vrací promise, ale tady nás to úplně nezajímá, protože kvůli useSession se komponenta automaticky aktualizuje, jakmile se změní aktivní session (a to se stane, když se odhlásíme)
    //NextJS pak vymaže cookie a vymaže informaci o tom, že je aktivní uživatel přihlášen
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
