import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame } from "./game.types";

interface GameState {
  games: IGame[];
  isLoading: boolean;
  error: string;
}

const initialState: GameState = {
  games: [],
  isLoading: false,
  error: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addGames: (state) => {
      state.isLoading = true;
    },
    addNewGames: (state) => {
      state.isLoading = true;
      state.games = [];
    },
    addGamesSuccess: (state, action: PayloadAction<IGame[]>) => {
      state.isLoading = false;
      state.games.push(...action.payload);
    },
    setGamesSuccess: (state, action: PayloadAction<IGame[]>) => {
      state.isLoading = false;
      state.games = [...action.payload];
    },
    addGamesError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeGames: () => {},
  },
});

export const gameReducer = gameSlice.reducer;
export const gameActions = gameSlice.actions;
