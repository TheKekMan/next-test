import Head from "next/head";
import { useEffect, useState } from "react";
import MainLayout from "../src/components/MainLayout";
import GameCard from "../src/components/GameCard";
import { Box, Grid, Paper, styled, Typography } from "../mui";
import { useGetGamesQuery } from "../src/store/games/game.api";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function Games() {
  const { data, isLoading, error } = useGetGamesQuery();
  return (
    <MainLayout>
      <Head>
        <title> Posts Page </title>
      </Head>

      {isLoading ? (
        <Typography variant={"h2"}>Loading...</Typography>
      ) : error ? (
        <Typography variant={"h2"}>Error</Typography>
      ) : (
        <Box sx={{ display: "flex", alignItems: "stretch" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 20, xl: 28 }}
            sx={{ justifyContent: "center" }}
          >
            {data?.map((game, index) => (
              <Grid item xs={2} sm={4} md={4} lg={6} key={index}>
                <Item>
                  {GameCard(
                    game.id,
                    game.name,
                    game.cover.url.replace("thumb", "1080p")
                  )}
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </MainLayout>
  );
}
