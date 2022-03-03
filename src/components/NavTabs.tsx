import Link from "next/link";
import React from "react";
import { Box, Tab, Tabs } from "../../mui";
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
  const [value, setValue] = React.useState(router.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <LinkTab label="Home" href="/" value={"/"} />
        <LinkTab label="Games" href="/games" value={"/games"} />
        <LinkTab label="About" href="/about" value={"/about"} />
      </Tabs>
    </Box>
  );
}
