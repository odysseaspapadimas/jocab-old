import { Input } from "@chakra-ui/input";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        borderColor="gray.500"
        focusBorderColor="secondary.100"
        placeholder="Type a word, kanji or sentence"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;
