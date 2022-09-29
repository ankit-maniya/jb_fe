import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  alignCenter: {
    textAlign: "center",
  },
  
  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  innerLayout: {
    margin: "1rem",
    marginTop: "5rem",
    marginBottom: "2rem",
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default useStyles;
