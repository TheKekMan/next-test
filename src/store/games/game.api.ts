import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGame, IGameInfo } from "./game.types";

export const gameApi = createApi({
  reducerPath: "api/games",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "text/plain");
      headers.set("Accept", "application/json");
      headers.set("Origin", "http://localhost:3000");
      headers.set(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      );
      headers.set("Client-ID", process.env.NEXT_PUBLIC_CLIENT_ID);
      return headers;
    },
    mode: "cors",
    credentials: "include",
  }),
  endpoints: (build) => ({
    getGames: build.query<IGame[], void>({
      query: () => ({
        url: `games`,
        method: "POST",
        body: "fields name, cover.url, first_release_date, total_rating, total_rating_count; limit 20; where cover != null & total_rating != null;",
        mode: "cors",
      }),
    }),
    getGameInfo: build.query<IGameInfo, void>({
      query: () => ({
        url: `games`,
        method: "POST",
        body: "fields name, cover.url, first_release_date, genres.name, screenshots.url, summary; limit 20; where cover != null & total_rating != null;",
        mode: "cors",
      }),
    }),
  }),
});

export const { useGetGamesQuery, useGetGameInfoQuery } = gameApi;
