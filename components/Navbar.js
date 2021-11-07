import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useContext, useState } from "react";
import useSWR from "swr";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import fetcher from "../helpers/fetcher";

const Navbar = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { auth, signOut } = useContext(FirebaseContext);
  const [showMenu, setShowMenu] = useState(false);

  const { data: vocab, error } = useSWR(
    `/api/vocabulary?uid=${user?.uid}`,
    fetcher
  );

  return (
    <nav className="my-5 flex w-full justify-between items-center">
      <div className="flex flex-col justify-center">
        <h1
          onClick={() => router.push("/")}
          className="text-3xl hover:cursor-pointer"
        >
          Jocab
        </h1>
        <p
          className=" self-end"
          style={{ fontSize: "0.5rem", marginTop: "-4px" }}
        >
          Powered by Jisho
        </p>
      </div>
      <div>{user && <h1>Welcome, {user?.displayName?.split(" ")[0]}</h1>}</div>
      <Box display={["none", "none", "flex", "flex"]}>
        <div className="flex justify-center items-center space-x-4">
          <Link href="/reader">
            <p className="px-4 py-2 bg-secondary border border-secondary hover:bg-secondary-hover cursor-pointer">
              Reader
            </p>
          </Link>
          {user && (
            <Link href="/vocabulary">
              <div className="relative px-4 py-2 bg-secondary border border-secondary hover:bg-secondary-hover cursor-pointer">
                <p className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-green-600 w-6 h-6 rounded-full text-sm flex items-center justify-center">
                  {vocab?.vocab[0] && !error
                    ? vocab.vocab[0].vocab.length
                    : "0"}
                </p>
                <a className="  ">Vocabulary</a>
              </div>
            </Link>
          )}
          <button
            onClick={() => {
              if (user) {
                signOut(auth);
                router.push("/");
              } else {
                router.push("/login");
              }
            }}
            className={`px-4 py-2 whitespace-nowrap ${
              !user
                ? "bg-secondary hover:bg-secondary-hover"
                : "border border-gray-500 bg-primary-hover hover:bg-gray-900"
            } `}
          >
            {user ? "Sign Out" : "Login"}
          </button>
        </div>
      </Box>
      <Box display={["flex", "flex", "none", "none"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 z-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => setShowMenu(!showMenu)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        {showMenu && (
          <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-gray-700 flex flex-col justify-start items-center space-y-8 pt-20">
            <Link href="/reader">
              <p className="px-4 py-2 bg-secondary border border-secondary hover:bg-secondary-hover cursor-pointer">
                Reader
              </p>
            </Link>
            {user && (
              <Link href="/vocabulary">
                <div className="relative">
                  <p className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-green-600 w-6 h-6 rounded-full text-sm flex items-center justify-center">
                    {vocab?.vocab[0] && !error
                      ? vocab.vocab[0].vocab.length
                      : "0"}
                  </p>
                  <a className="px-4 py-2 bg-secondary border border-secondary hover:bg-secondary-hover cursor-pointer">
                    Vocabulary
                  </a>
                </div>
              </Link>
            )}
            <button
              onClick={() => {
                if (user) {
                  signOut(auth);
                  router.push("/");
                } else {
                  router.push("/login");
                }
              }}
              className={`px-4 py-2 whitespace-nowrap ${
                !user
                  ? "bg-secondary hover:bg-secondary-hover"
                  : "border border-gray-500 bg-primary-hover hover:bg-gray-900"
              } `}
            >
              {user ? "Sign Out" : "Login"}
            </button>
          </div>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
