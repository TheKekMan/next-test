import Link from "next/link";
import React from "react";
import { Box, Tab, Tabs } from "../../../mui";
import { useRouter } from "next/router";

function LinkTab(props) {
  return (
    <Link href={props.href} passHref>
      <Tab {...props} />
    </Link>
  );
}

export default function NavTabs() {
  const router = useRouter();

  // @ts-ignore
  const [[, currentRoot]] = router.pathname.matchAll(/^(\/[^/]*)/g);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={currentRoot}>
        <LinkTab label="Home" href="/" value={"/"} />
        <LinkTab label="Games" href="/games" value={"/games"} />
        <LinkTab label="About" href="/about" value={"/about"} />
      </Tabs>
    </Box>
  );
}
