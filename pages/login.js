import { auth, signInWithPopup, GoogleAuthProvider } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from "next/dist/client/router";

const login = () => {
  const router = useRouter();
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        //console.log(user);
        // ...

        const response = await fetch("/api/login", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(user), // body data type must match "Content-Type" header
        });

        router.push("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="mt-6 flex justify-center items-center">
      <button onClick={handleLogin} className="bg-secondary py-2 px-3 ">
        Login with Google
      </button>
    </div>
  );
};

export default login;
