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
} from "../mui";

export default function PostCard(postId, title, desc, url) {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
        }}
      >
        <Link href={`/post/[id]`} as={`/post/${postId}`} passHref>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={url}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {desc}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </>
  );
}
