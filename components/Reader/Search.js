import { Input } from "@chakra-ui/input";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

const Search = ({ setResults, setShowResults }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.length > 0) {
      //router.push(`/search/${query}`);

      const res = await fetch(`/api/search?q=${query}`);

      const results = await res.json();
      setResults(results);
      console.log(results);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        backgroundColor="rgba(0, 0, 0, 0.4)"
        borderColor="gray.500"
        focusBorderColor="secondary.100"
        placeholder="Type a word, kanji or sentence"
        _focus={{ backgroundColor: "black" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;
