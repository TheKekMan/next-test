import MainLayout from "../src/components/layout/MainLayout";
import Head from "next/head";

export default function About() {
  return (
    <MainLayout>
      <Head>
        <title> Posts Page </title>
      </Head>
      <h1>About</h1>
    </MainLayout>
  );
}
