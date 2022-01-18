import { unstable_composeClasses } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../components/mainlayout";

export default function Post({ post: serverPost }) {
  const [clientPost, setPost] = useState(serverPost);

  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${router.query.id}`
      );
      const posts = await res.json();

      setPost(posts);
    }
    if (!serverPost) {
      load();
    }
  }, []);

  if (!clientPost) {
    return (
      <MainLayout>
        <h1>Loading...</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1>{clientPost.title}</h1>
      <p>{clientPost.body}</p>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ req, params }) {
  if (!req) {
    return {
      props: { post: null },
    };
  }
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();
  console.log("loaded");
  return {
    props: { post },
  };
}
