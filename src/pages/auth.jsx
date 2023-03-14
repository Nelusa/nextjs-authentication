import AuthForm from "@/components/auth/AuthForm";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  //const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      //setLoadedSession(session)

      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
};

export default AuthPage;
