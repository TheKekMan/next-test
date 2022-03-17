import Link from "next/link";
import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "../../../mui";

export default function GameCard(postId, name, url) {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
        }}
      >
        <Link href={`/games/[id]`} as={`/games/${postId}`} passHref>
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
