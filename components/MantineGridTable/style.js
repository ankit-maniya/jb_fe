import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  gridWrapper: {
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    margin: 0,
    marginTop: theme.spacing.lg,
  },
  gridProps: {
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: theme.colors.gray[6],
  },
}));

export default useStyles;
