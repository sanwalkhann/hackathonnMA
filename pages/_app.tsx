import { AppProps } from "next/app";
import FullLayout from "../src/layouts/FullLayout";
import Head from "next/head";
import "../styles/style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Xtreme Starter Next Js App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FullLayout>
        <Component {...pageProps} />
      </FullLayout>
    </>
  );
}

export default MyApp;