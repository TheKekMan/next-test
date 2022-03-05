import Head from "next/head";
import MainLayout from "../src/components/layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="This is my first Next App" />
      </Head>
      Home Page
    </MainLayout>
  );
}
