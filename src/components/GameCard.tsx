import Link from "next/link";
import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "../../mui";

export default function GameCard(postId, name, url) {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
        }}
      >
        <Link href={`/game/[id]`} as={`/game/${postId}`} passHref>
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
