import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ReactToast } from "../components";

export const getUniqueId = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
};

export const openDeleteModal = (from, fn, type, item) =>
  openConfirmModal({
    title: "Delete Cutting Type",
    centered: true,
    children: (
      <Text size="sm">Are you sure you want to delete cutting type!</Text>
    ),
    labels: { confirm: "Delete Cutting Type", cancel: "No don't delete it" },
    confirmProps: { color: "red" },
    // onCancel: () => console.log("dont delete!"),
    onConfirm: () => {
      if (from == "loat") {
        fn(type, item);
      } else if (from == "cuttingtype") {
        fn(true, item);
      }
      ReactToast("success", "Deleted Successfully  !");
    },
  });
