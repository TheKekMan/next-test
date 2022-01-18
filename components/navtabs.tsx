import Link from "next/link";
import React from "react";
import { Box, Tab, Tabs } from "../mui";
import Home from "../pages";

export default function NavTabs() {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={false}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Link href="/" passHref>
          <Tab label="Home" />
        </Link>
        <Link href="/posts" passHref>
          <Tab label="Posts" />
        </Link>
        <Link href="/about" passHref>
          <Tab label="About" />
        </Link>
      </Tabs>
    </Box>
  );
}
