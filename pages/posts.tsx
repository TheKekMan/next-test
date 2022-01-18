import Head from "next/head";
import { useEffect, useState } from "react";
import MainLayout from "../components/mainlayout";
import NavTabs from "../components/navtabs";
import PostCard from "../components/postCard";
import { Box, Grid, Paper, styled } from "../mui";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function Posts({ posts: serverPosts, photos: serverPhotos }) {
  const [clientPosts, setPosts] = useState(serverPosts);
  const [clientPhotos, setPhotos] = useState(serverPhotos);

  useEffect(() => {
    async function load() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts = await res.json();

      setPosts(posts);
    }
    if (!serverPosts) {
      load();
    }
  }, []);

  useEffect(() => {
    async function load() {
      const res = await fetch("https://jsonplaceholder.typicode.com/photos");
      const photos = await res.json();

      setPhotos(photos);
    }
    if (!serverPhotos) {
      load();
    }
  }, []);

  if (!clientPhotos || !clientPosts) {
    return (
      <MainLayout>
        <h1>Loading...</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title> Posts Page </title>
      </Head>
      <Box sx={{ display: "flex", alignItems: "stretch" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 20, xl: 28 }}
          sx={{ justifyContent: "center" }}
        >
          {clientPosts.map((post, index) => (
            <Grid item xs={2} sm={4} md={4} lg={6} key={index}>
              <Item>
                {PostCard(
                  post.id,
                  post.title,
                  post.body,
                  clientPhotos[index].url
                )}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
}
export async function getStaticProps({ req }) {
  if (!req) {
    return {
      props: { posts: null, photos: null },
    };
  }
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_delay=2003"
  );
  const posts = await res.json();

  const res1 = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_delay=2003"
  );
  const photos = await res1.json();

  console.log("loading");

  return {
    props: { posts, photos },
  };
}
