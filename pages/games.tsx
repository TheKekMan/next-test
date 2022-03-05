import Head from "next/head";
import MainLayout from "../src/components/layout/MainLayout";
import GameList from "../src/components/game/GameList";

export default function Games() {
  return (
    <MainLayout>
      <Head>
        <title> Games Page </title>
      </Head>
      <GameList />
    </MainLayout>
  );
}
