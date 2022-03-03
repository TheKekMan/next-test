import { configureStore } from "@reduxjs/toolkit";
import { gameApi } from "./games/game.api";

export const store = configureStore({
  reducer: { [gameApi.reducerPath]: gameApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameApi.middleware),
});

export type TypeRootState = ReturnType<typeof store.getState>;
