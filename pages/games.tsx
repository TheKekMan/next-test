import Head from "next/head";
import MainLayout from "../src/components/layout/MainLayout";
import GameList from "../src/components/game/GameList";
import { Box, TextField } from "../mui";
import { ChangeEvent, useCallback, useState } from "react";
import debounce from "lodash/debounce";

export default function Games() {
  const [searchGame, setSearchGame] = useState("");
  const [error, setError] = useState(false);

  const debouncedSearch = useCallback(
    debounce((q) => {
      setSearchGame(q);
    }, 600),
    []
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2 || e.target.value.length === 0) {
      setError(false);
      debouncedSearch(e.target.value);
    } else {
      setError(true);
    }
  };

  return (
    <MainLayout>
      <Head>
        <title> Games Page </title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <GameList searchText={searchGame}>
          <TextField
            fullWidth
            label="Search"
            id="fullWidth"
            onChange={handleChange}
            error={error}
          />
        </GameList>
      </Box>
    </MainLayout>
  );
}
