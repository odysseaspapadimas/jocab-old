import Head from "next/head";
import { useContext } from "react";
import { useEffect } from "react";
import JishoAPI from "unofficial-jisho-api";
import Navbar from "../../components/Navbar";
import ResultCard from "../../components/ResultCard";
import Search from "../../components/Search";
import UserContext from "../../context/user";
import { isJapanese } from "../../lib/isJapanese";

const SearchResults = ({ data: results, query }) => {
  const { user } = useContext(UserContext);

  const addSearchEntry = async () => {
    // const res = await fetch("/api/history/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     uid: user.uid,
    //     query,
    //   }),
    // });

    // const data = await res.json();
    // console.log(data, "status");
  };

  useEffect(() => {
    addSearchEntry();
  }, [user, query]);

  return (
    <div>
      <Head>
        <title>{query} | Jimmer</title>
      </Head>
      <>
        <Navbar />
        <Search />
        {results.length > 0 ? (
          <>
            {results.map((result, i) => {
              if (
                result.japanese[0].word !== undefined &&
                isJapanese(result.japanese[0].word) &&
                isJapanese(result.japanese[0].reading) &&
                result.japanese[0].reading !== undefined
              ) {
                return <ResultCard key={result.slug + i} result={result} />;
              }
            })}
          </>
        ) : (
          <h1 className="mt-2">
            Couldn't find anything on <u>{query}</u>, try something different
          </h1>
        )}
      </>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const jisho = new JishoAPI();
  let { data } = await jisho.searchForPhrase(params.query);

  return { props: { data, query: params.query } };
}

export default SearchResults;
