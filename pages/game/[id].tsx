import { unstable_composeClasses } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../src/components/MainLayout";
import Head from "next/head";

export default function Post({ gameInfo }) {
  const game = gameInfo[0];
  return (
    <MainLayout>
      <Head>
        <title> {game.name}</title>
      </Head>
      <h1>{game.name}</h1>
      <p>{game.summary}</p>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
    body: `fields name, cover.url, summary; where id=${context.query.id};`,
  });
  const gameInfo = await res.json();
  return {
    props: { gameInfo },
  };
}
