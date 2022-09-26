import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  m: {
    margin: "1rem",
  },
  ckBoxBen: {
    disabled: true,
    borderRadius: theme.radius.sm,
    padding: "7px",
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : "#ced4da"
    }`,
    width: "100%",
  },
  redBtnStyle: {
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : "#FF0000",
    },

    "&:focus": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : "#FF0000",
      borderColor: "#FF0000",
      outlineColor: "#FF0000",
    },
  },
}));

export default useStyles;
