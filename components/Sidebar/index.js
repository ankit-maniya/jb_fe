import { Navbar, ScrollArea, Avatar } from "@mantine/core";
import { LinksGroup } from "../Navlink";

import useStyles from "./style";
import { menuData } from "./menu_list";

export const SidebarCT = () => {
  const { classes } = useStyles();
  const links = menuData.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar height="100%" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <div>
          <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" />
          <div className={classes.profile}>
            <div>JAY BHAGAWATI LASER</div>
            <div>jaybhagawati@gmail.com</div>
          </div>
        </div>
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
};
