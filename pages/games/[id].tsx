import MainLayout from "../../src/components/layout/MainLayout";
import Head from "next/head";
import { IGameInfo } from "../../src/store/games/game.types";
import GameInfo from "../../src/components/game/GameInfo";
import { store } from "../_app";
import { gameApi, useGetGameInfoQuery } from "../../src/store/games/game.api";
import { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/query";

export default function Game() {
  const router = useRouter();
  const result = useGetGameInfoQuery(
    typeof router.query.id === "string" ? router.query.id : skipToken,
    { skip: router.isFallback }
  );

  const { isLoading, data } = result;
  if (router.isFallback || isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <MainLayout>
      <Head>
        <title> {data[0].name}</title>
      </Head>
      <GameInfo props={data[0]} />
    </MainLayout>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  store.dispatch(gameApi.endpoints.getGameInfo.initiate(params.id));
  await Promise.all(gameApi.util.getRunningOperationPromises());
  return {
    props: {},
  };
}
