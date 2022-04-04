import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "../../../mui";
import { Link } from "@mui/material";

export default function GameCard(postId, name, url) {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
        }}
      >
        <Link href={`/games/${postId}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="auto"
              image={url}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </>
  );
}
