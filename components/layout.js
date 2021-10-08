import { Container } from "@chakra-ui/react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="search"
          href="/opensearch.xml"
          type="application/opensearchdescription+xml"
          title="Name of the search"
        />
      </Head>
      <Container maxW="container.lg">{children}</Container>
    </>
  );
};

export default Layout;
