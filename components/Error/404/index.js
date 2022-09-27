import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import { useRouter } from "next/router";
import image from "../../../public/404.svg";
import useStyles from "./style";

export const NotFound404 = () => {
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
      >
        <Image alt="desk" src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open party data does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => {
              router.push("/partys");
            }}
          >
            Get back to Party Page
          </Button>
        </div>
        <Image alt="desk" src={image.src} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};
