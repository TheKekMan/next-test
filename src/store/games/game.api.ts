import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGame, IGameInfo } from "./game.types";
import { gameSlice } from "./game.slice";
import { HYDRATE } from "next-redux-wrapper";

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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getGames: build.query<IGame[], number>({
      query: (limit) => ({
        url: `games`,
        method: "POST",
        body: `fields name, cover.url, first_release_date, total_rating, total_rating_count, genres, videos.video_id; limit 9; offset ${limit}; where cover != null & total_rating != null & genres != null & videos != null;`,
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
    getGameInfo: build.query<IGameInfo, number>({
      query: (gameId) => ({
        url: `games`,
        method: "POST",
        body: `fields name, cover.url, first_release_date, genres.name, screenshots.url, summary, videos.video_id; where id=${gameId};`,
        mode: "cors",
      }),
    }),
  }),
});

export const { useGetGamesQuery, useGetGameInfoQuery } = gameApi;
