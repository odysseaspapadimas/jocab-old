import "tailwindcss/tailwind.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/layout";
import UserContext from "../context/user";
import useUser from "../hooks/useUser";
import FirebaseContext from "../context/firebase";
import { auth, signOut } from "../lib/firebase";

const theme = extendTheme({
  colors: {
    secondary: {
      100: "hsl(345, 67%, 55%)",
      // ...
      900: "#1a202c",
    },
  },
});

function MyApp({ Component, pageProps }) {
  const user = useUser();
  return (
    <ChakraProvider theme={theme}>
      <FirebaseContext.Provider value={{ auth, signOut }}>
        <UserContext.Provider value={{ ...user }}>
          <Layout>
            <Component {...pageProps} />
            <style jsx global>
              {`
                body {
                  background-color: #0b0e11 !important;
                  color: #fff !important;
                  font-family: "Montserrat", "Nanum Gotchic", sans-serif !important;
                }
              `}
            </style>
          </Layout>
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </ChakraProvider>
  );
}
export default MyApp;
