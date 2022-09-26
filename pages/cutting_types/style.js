import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  innerLayout: {
    margin: "1rem",
    marginTop: "5rem",
    marginBottom: "2rem",
  },
  m: {
    margin: "1rem",
  },
  "m-xs": {
    margin: "1.5rem",
  },
  "m-sm": {
    margin: "3rem",
  },
  "m-md": {
    margin: "5rem",
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
