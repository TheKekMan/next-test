import React from "react";
import { IGameInfo } from "../../store/games/game.types";
import { Box, Paper, Stack, styled, Typography } from "../../../mui";
import MediaCarousel from "./MediaCarousel";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.light,
}));

const GameInfo = ({ props }) => {
  const game: IGameInfo = props;
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          width: "70%",
          margin: "2em 0",
        }}
      >
        <Typography variant={"h3"}>{game.name}</Typography>
        <MediaCarousel screenshots={game.screenshots} videos={game.videos} />
        <Stack direction="row" spacing={2}>
          {game.genres.map((genre) => (
            <Item key={genre.id}>{genre.name}</Item>
          ))}
        </Stack>
        <Typography variant={"h5"}>{game.summary}</Typography>
      </Box>
    </Box>
  );
};

export default GameInfo;
