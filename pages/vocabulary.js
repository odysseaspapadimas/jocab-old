import {
  useToast,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import VocabCard from "../components/Vocabulary/VocabCard";
import UserContext from "../context/user";
import useProtectedRoute from "../hooks/useProtectedRoute";

const Vocabulary = () => {
  const { user } = useContext(UserContext);
  const [vocabulary, setVocabulary] = useState({ vocab: [] });

  const [sort, setSort] = useState({
    type: "date",
    dateAsc: false,
    freqAsc: false,
  }); //sort by "date" or "frequency" and asc/desc for the different types

  const toast = useToast();

  const fetchVocab = async () => {
    const res = await fetch("/api/vocabulary/", {
      method: "GET",
      headers: {
        Authorization: user.uid,
      },
    });
    const { vocab } = await res.json();
    if (vocab === undefined) return;
    setVocabulary(vocab[0]);
    console.log(vocab[0]);
  };

  useEffect(() => {
    if (!user) return;

    fetchVocab();
  }, [user]);
  useEffect(() => {
    if (!user) return;

    console.log(vocabulary, vocabulary.vocab.length);
  }, [vocabulary]);

  const handleRemove = async (word) => {
    console.log("remove ", word);

    const res = await fetch("/api/vocabulary/remove", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
        word: word,
      }),
    });

    if (res.status === 200) {
      console.log("Successfull removal");
      toast({
        title: "Removed word",
        description: "Succesfully removed word.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchVocab();
    }
  };

  return (
    <div>
      <Navbar />

      {vocabulary && vocabulary.vocab?.length > 0 ? (
        <>
          <h1>You know {vocabulary.vocab?.length} words</h1>
          <div className="my-4 w-full flex justify-end">
            <Menu placement="bottom-end" closeOnSelect={false}>
              <MenuButton
                as={Button}
                bgColor={"gray.800"}
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "secondary.100" }}
                _focus={{ boxShadow: "outline" }}
              >
                Sort by
              </MenuButton>
              <MenuList bgColor={"gray.800"} minWidth="240px">
                <MenuOptionGroup defaultValue="date" type="radio">
                  <MenuItemOption
                    _highlighted={{ bg: "secondary.100" }}
                    _focus={{ bg: "secondary.100" }}
                    _hover={{ bg: "secondary.100" }}
                    value="date"
                    onClick={() => {
                      if (sort.type === "date") {
                        setSort((prev) => ({
                          type: "date",
                          dateAsc: !prev.dateAsc,
                          freqAsc: prev.freqAsc, //reset it
                        }));
                      } else {
                        setSort((prev) => ({
                          type: "date",
                          dateAsc: false,
                          freqAsc: prev.freqAsc, //reset it
                        }));
                      }
                    }}
                  >
                    Date added{" "}
                    {sort.type === "date" && !sort.dateAsc
                      ? "(newest)"
                      : sort.type === "date" && sort.dateAsc && "(oldest)"}
                  </MenuItemOption>
                  <MenuItemOption
                    _highlighted={{ bg: "secondary.100" }}
                    _focus={{ bg: "secondary.100" }}
                    _hover={{ bg: "secondary.100" }}
                    value="freq"
                    onClick={() => {
                      if (sort.type === "frequency") {
                        setSort((prev) => ({
                          type: "frequency",
                          dateAsc: prev.dateAsc, //reset it
                          freqAsc: !prev.freqAsc,
                        }));
                      } else {
                        setSort((prev) => ({
                          type: "frequency",
                          dateAsc: prev.dateAsc, //reset it
                          freqAsc: false,
                        }));
                      }
                    }}
                  >
                    Frequency{" "}
                    {sort.type === "frequency" && !sort.freqAsc
                      ? "(asc)"
                      : sort.type === "frequency" && sort.freqAsc && "(desc)"}
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </div>
          <div
            className={`grid grid-cols-1 mb-4 ${
              vocabulary.vocab.length > 1 && " md:grid-cols-2"
            } gap-4`}
          >
            {vocabulary.vocab
              .sort((a, b) => {
                if (sort.type === "date" && sort.dateAsc) {
                  return b.dateAdded - a.dateAdded;
                } else if (sort.type === "date" && !sort.dateAsc) {
                  return a.dateAdded - b.dateAdded;
                } else if (sort.type === "frequency" && !sort.freqAsc) {
                  if (a.frequency === null && b.frequency === null) {
                    return 0;
                  }
                  if (a.frequency === null) {
                    return 1;
                  }

                  if (b.frequency === null) {
                    return -1;
                  }

                  return a.frequency - b.frequency;
                } else {
                  if (a.frequency === null && b.frequency === null) {
                    return 0;
                  }
                  if (a.frequency === null) {
                    return -1;
                  }

                  if (b.frequency === null) {
                    return 1;
                  }

                  return b.frequency - a.frequency;
                }
              })
              .map((item, i) => (
                <VocabCard
                  key={item + i}
                  word={item.word}
                  reading={item.reading}
                  meanings={item.meanings}
                  frequency={item.frequency}
                  status={item.status}
                  handleRemove={handleRemove}
                />
              ))}
          </div>
        </>
      ) : (
        <h1>You have no words. Go add some!</h1>
      )}
    </div>
  );
};

export default useProtectedRoute(Vocabulary);
