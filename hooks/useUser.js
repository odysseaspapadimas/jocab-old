import { auth, onAuthStateChanged } from "../lib/firebase";
import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, [auth]);

  return { user };
};

export default useUser;
