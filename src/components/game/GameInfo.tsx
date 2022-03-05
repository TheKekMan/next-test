import React from "react";
import { IGameInfo } from "../../store/games/game.types";
import { store } from "../../../pages/_app";
import { gameApi } from "../../store/games/game.api";
import { Box, Typography } from "../../../mui";
import MediaCarousel from "./MediaCarousel";

const GameInfo = ({ props }) => {
  const game: IGameInfo = props;
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "70%", marginTop: "3em" }}>
        <Typography variant={"h3"}>{game.name}</Typography>
        <MediaCarousel screenshots={game.screenshots} videos={game.videos} />
        <Typography variant={"h5"}>{game.summary}</Typography>
      </Box>
    </Box>
  );
};

export default GameInfo;
