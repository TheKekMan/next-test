import MainLayout from "../../src/components/layout/MainLayout";
import Head from "next/head";
import { IGameInfo } from "../../src/store/games/game.types";
import GameInfo from "../../src/components/game/GameInfo";
import { store } from "../_app";
import { gameApi } from "../../src/store/games/game.api";
import { useRouter } from "next/router";

export default function Game({ res }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!res) {
    return <h1>Game not found</h1>;
  }

  const game: IGameInfo = res;
  return (
    <MainLayout>
      <Head>
        <title> {game.name}</title>
      </Head>
      <GameInfo props={game} />
    </MainLayout>
  );
}

export async function getStaticPaths() {
  return { paths: [{ params: { id: "50270" } }], fallback: true };
}

export async function getStaticProps({ params }) {
  store.dispatch(gameApi.endpoints.getGameInfo.initiate(params.id));
  const res = await Promise.all(
    gameApi.util.getRunningOperationPromises()
  ).then((results: Array<any>) => {
    let gameInfo = results[0].data;
    if (gameInfo) {
      return gameInfo[0];
    } else return null;
  });
  return {
    props: { res },
    revalidate: 1,
  };
}
