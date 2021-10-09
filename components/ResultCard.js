import { useContext } from "react";
import { useEffect, useState } from "react";
import UserContext from "../context/user";
import EnglishDefinitions from "./EnglishDefinitions/EnglishDefinitions";
import Word from "./Word";
import WordStats from "./WordStats";
import { useToast } from "@chakra-ui/react";

const ResultCard = ({ result }) => {
  const [frequency, setFrequency] = useState(null);
  const { user } = useContext(UserContext);
  const [isOnList, setIsOnList] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchFrequency = async () => {
      const res = await fetch(encodeURI(`/api/frequency/${result.slug}`));

      const freq = await res.json();
      console.log(freq, "error message");
      if (freq === undefined) {
        setFrequency(undefined);
        return;
      }

      setFrequency(freq);
    };

    const checkWordStatus = async () => {
      if (!user) return;
      const res = await fetch(`/api/vocabulary/${user.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: result.japanese[0].word,
        }),
      });

      const response = await res.json();
      setIsOnList(response.onList);
    };
    checkWordStatus();
    fetchFrequency();
  }, []);

  const handleAdd = async () => {
    const res = await fetch(`/api/vocabulary/${user.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: result.japanese[0].word,
        reading: result.japanese[0].reading,
        meaning: result.senses,
        frequency,
        status: "learning",
        dateAdded: Date.now(),
      }),
    });

    const response = await res.json();
    console.log(res.status);
    if (res.status === 201) {
      setIsOnList(true);
      toast({
        title: "Word added.",
        description: `${result.japanese[0].word} was added to your list`,
        status: "success",
        duration: 3500,
        isClosable: true,
      });
    }
    console.log(response);
  };

  return (
    <div className="mt-5 relative flex flex-col lg:flex-row w-full border rounded-lg border-gray-500 p-8">
      <div className="w-64">
        {/* <h1>{JSON.stringify(result)}</h1> */}
        <Word
          word={result.japanese[0].word}
          reading={result.japanese[0].reading}
        />
        <WordStats
          isCommon={result.is_common}
          jlpt={result.jlpt[0]}
          frequency={frequency}
        />
      </div>
      <div className="ml-4 max-w-md">
        <EnglishDefinitions senses={result.senses} />
      </div>
      <div className="absolute top-8 right-8">
        {user && (
          <button
            onClick={handleAdd}
            className={`p-2 text-sm ${
              isOnList || frequency === null
                ? "border border-gray-500 bg-primary-hover hover:bg-gray-900"
                : "bg-secondary hover:bg-secondary rounded-sm"
            }`}
            disabled={isOnList || frequency === null}
          >
            {isOnList ? "Already on list" : "Add to list"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
