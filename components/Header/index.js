import { Header, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";
import { DrawerCT } from "../Drawer";
import { SidebarCT } from "../Sidebar";
import useStyles from './style'

export const HeaderCT = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <>
      <Header fixed={true} height={56} className={classes.header}>
        <div className={classes.inner}>
          <Group>
            <Burger opened={opened} onClick={toggle} size="sm" />
            <MantineLogo size={28} />
          </Group>
        </div>
      </Header>
      <DrawerCT opened={opened} setOpened={toggle} sidebar={<SidebarCT />}/>
    </>
  );
};
