import { useState } from "react";
import { Modal } from "@mantine/core";

export const CustomModel = ({ content, openModel, setModelOpen }) => {

  return (
    <Modal
      centered
      opened={openModel}
      onClose={() => setModelOpen(false)}
      title="Introduce yourself!"
    >
      {content}
    </Modal>
  );
};
