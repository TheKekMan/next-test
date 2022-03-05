import MainLayout from "../../src/components/layout/MainLayout";
import Head from "next/head";
import { IGameInfo } from "../../src/store/games/game.types";
import GameInfo from "../../src/components/game/GameInfo";
import { store } from "../_app";
import { gameApi } from "../../src/store/games/game.api";

export default function Game({ res }) {
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

export async function getServerSideProps(context) {
  store.dispatch(gameApi.endpoints.getGameInfo.initiate(context.query.id));
  const res = await Promise.all(
    gameApi.util.getRunningOperationPromises()
  ).then((results: Array<any>) => {
    let gameInfo = results[0].data;
    return gameInfo[0];
  });
  return {
    props: { res },
  };
}
