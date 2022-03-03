import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameApi } from "./games/game.api";
import { gameReducer } from "./games/game.slice";

const rootReducer = combineReducers({
  [gameApi.reducerPath]: gameApi.reducer,
  game: gameReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(gameApi.middleware),
  });
};

export type TypeRootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
