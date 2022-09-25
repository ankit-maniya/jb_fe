import { Drawer } from "@mantine/core";

export const DrawerCT = (props) => {
  const { opened, setOpened, sidebar } = props;
  return (
    <>
      <Drawer
        withCloseButton={false}
        transition="rotate-left"
        transitionDuration={250}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        {sidebar || null}
      </Drawer>
    </>
  );
};
