import Head from "next/head";
import Navbar from "../components/Navbar";
import Search from "../components/Search";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jimmer | Japanese Immersion</title>
        <meta content="japanese, study" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="search"
          href="/opensearch.xml"
          type="application/opensearchdescription+xml"
          title="Name of the search"
        />
      </Head>

      <Navbar />
      <Search />
    </div>
  );
}
