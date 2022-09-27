import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
} from "@mantine/core";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons";

import useStyles from "./style";

export const LinksGroup = ({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  pagelink,
  child,
}) => {
  const router = useRouter();
  let isActive = false;
  const activePathName = router.pathname;

  const { classes, theme, cx } = useStyles();

  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;

  if (child && child.length > 0 && child.includes(activePathName)) {
    isActive = true;
  }

  const hasLinks = Array.isArray(links);
  const items = (hasLinks ? links : []).map((link) => {
    return (
      <Link
        href={{
          pathname: link.pagelink || "",
          query: link.query || {},
        }}
        key={link.label}
      >
        <Text className={classes.link}>{link.label}</Text>
      </Link>
    );
  });

  return (
    <>
      <UnstyledButton
        // onClick={() => setOpened((o) => !o)}
        // className={classes.control}
        onClick={() => {
          setOpened((o) => !o);
        }}
        className={cx(classes.control, {
          [classes.active]: isActive || pagelink == activePathName,
        })}
      >
        <Link href={pagelink || ""}>
          <Group position="apart" spacing={0}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon
                variant={
                  isActive || pagelink == activePathName ? "filled" : "light"
                }
                size={30}
              >
                <Icon size={18} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>

            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size={14}
                stroke={1.5}
                style={{
                  transform: opened
                    ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                    : "none",
                }}
              />
            )}
          </Group>
        </Link>
      </UnstyledButton>

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
};
