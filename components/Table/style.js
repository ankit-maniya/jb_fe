import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },
  fixedWdth: {
    width: "7rem",
  },
  centerText: {
    textAlign: "center",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "space-between",
  },
  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

export default useStyles;
