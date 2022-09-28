import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  innerLayout: {
    marginTop: "5rem",
    marginBottom: "1rem"
  },
  addBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },
  ckBoxBen: {
    disabled  : true,
    borderRadius: theme.radius.sm,
    padding: "7px",
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.gray[8] : "#ced4da"
    }`,
    backgroundColor: theme.colorScheme === "dark" ? "#25262b" : "white",
    width: "100%"
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
