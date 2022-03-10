import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import useInView from "react-cool-inview";
import { useGetGamesQuery } from "../../store/games/game.api";
import { Box, Grid, Paper, styled, Typography } from "../../../mui";
import { Circle } from "better-react-spinkit";
import GameCard from "./GameCard";

const GridItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const GameList = ({ children, searchText }) => {
  const { games, isLoading, error } = useTypedSelector((state) => state.game);
  const { inView, observe } = useInView();
  const [limit, setLimit] = useState(0);
  useGetGamesQuery({ limit: limit, search: searchText });
  useEffect(() => {
    if (inView) {
      setLimit(limit + 9);
    }
  }, [inView]);

  useEffect(() => {
    setLimit(0);
  }, [searchText]);

  return (
    <Box sx={{ width: "90%" }}>
      {children}
      {error ? (
        <Typography variant={"h4"} align={"center"}>
          {error}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 20, xl: 28 }}
            sx={{ justifyContent: "center", minHeight: "100px" }}
          >
            {games?.map((game, index) => (
              <Grid item xs={2} sm={4} md={4} lg={6} key={index}>
                <GridItem>
                  {GameCard(
                    game.id,
                    game.name,
                    game.cover.url.replace("thumb", "1080p")
                  )}
                </GridItem>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{ height: "100px", alignSelf: "center", justifySelf: "center" }}
            ref={observe}
          >
            {isLoading ? <Circle size={100} color={"#1976d2"} /> : null}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GameList;
