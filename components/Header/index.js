import {
  Header,
  Group,
  Burger,
  Badge,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";
import { DrawerCT } from "../Drawer";
import { SidebarCT } from "../Sidebar";
import useStyles from "./style";
import { IconMoonStars, IconSun } from "@tabler/icons";

export const HeaderCT = ({ title = "JAY BHAGAVATI LASER", component }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { classes } = useStyles();

  return (
    <>
      <Header fixed={true} height={56} className={classes.header}>
        <div className={classes.inner}>
          <Group>
            <Burger opened={opened} onClick={toggle} size="sm" />
            <MantineLogo size={28} />
          </Group>
          <Group>
            {component}
            <Badge
              variant="gradient"
              size="lg"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              {title}
            </Badge>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {colorScheme === "dark" ? (
                <IconSun size={18} />
              ) : (
                <IconMoonStars size={18} />
              )}
            </ActionIcon>
          </Group>
        </div>
      </Header>
      <DrawerCT opened={opened} setOpened={toggle} sidebar={<SidebarCT />} />
    </>
  );
};
