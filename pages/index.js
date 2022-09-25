import Head from "next/head";
import { useForm } from "@mantine/form";
// import styles from "../styles/Home.module.css";

import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Input,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: "100vh",
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 0 ? "Password is Required" : null),
    },
  });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={classes.wrapper}>
          <form
            onSubmit={form.onSubmit((values) => {
              console.log("calledd", values);
            })}
          >
            <Paper className={classes.form} radius={0} p={30}>
              <Title
                order={2}
                className={classes.title}
                align="center"
                mt="md"
                mb={50}
              >
                Welcome to JB Software!
              </Title>

              <Input.Label size="md" mb={7} required>
                Email
              </Input.Label>
              <TextInput
                size="md"
                // label="Username"
                placeholder="Email"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && form.errors.email}
              />

              <Input.Label size="md" mb={7} mt={10} required>
                Password
              </Input.Label>
              <PasswordInput
                size="md"
                // label="Password"
                placeholder="Password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={form.errors.password && form.errors.password}
              />
              <Button fullWidth type="submit" mt="xl" size="md">
                Login
              </Button>
            </Paper>
          </form>
        </div>
      </main>
    </div>
  );
}
