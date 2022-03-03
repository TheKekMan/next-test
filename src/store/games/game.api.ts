import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGame, IGameInfo } from "./game.types";
import { AppDispatch } from "../store";
import { gameSlice } from "./game.slice";

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
    getGames: build.query<IGame[], number>({
      query: (limit) => ({
        url: `games`,
        method: "POST",
        body: `fields name, cover.url, first_release_date, total_rating, total_rating_count; limit 9; offset ${limit}; where cover != null & total_rating != null;`,
        mode: "cors",
      }),
      async onQueryStarted(limit, { dispatch, queryFulfilled }) {
        dispatch(gameSlice.actions.addGames());
        try {
          const { data } = await queryFulfilled;
          dispatch(gameSlice.actions.addGamesSuccess(data));
        } catch (err) {
          dispatch(
            gameSlice.actions.addGamesError(
              "An error occurred while uploading data"
            )
          );
        }
      },
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
