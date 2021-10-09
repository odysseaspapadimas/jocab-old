import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Navbar = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { auth, signOut } = useContext(FirebaseContext);

  const { data: vocab, error } = useSWR(
    `/api/vocabulary?uid=${user?.uid}`,
    fetcher
  );

  console.log(vocab);

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
      <Flex display={["none", "none", "flex", "flex"]}>
        {user && <h1>Welcome, {user?.displayName?.split(" ")[0]}</h1>}
      </Flex>
      <div className="flex justify-center items-center space-x-4">
        {user && (
          <Link href="/vocabulary">
            <div className="relative">
              <p className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-green-600 w-6 h-6 rounded-full text-sm flex items-center justify-center">{vocab?.vocab[0] && !error ? vocab.vocab[0].vocab.length : "0"}</p>
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
    </nav>
  );
};

export default Navbar;
