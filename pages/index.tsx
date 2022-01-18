import Head from "next/head";
import MainLayout from "../components/mainlayout";

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>My first Next App</title>
        <meta name="description" content="This is my first Next App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Home Page
    </MainLayout>
  );
}
