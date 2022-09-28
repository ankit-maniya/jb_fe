import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ReactToast } from "../components";

export const getUniqueId = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
};

const defaultActions = {
  labels: { confirm: "Delete", cancel: "No" },
  title: "Delete",
  msg: "Are you sure you want to delete!",
};

export const openDeleteModal = ({
  from,
  fn,
  type,
  item,
  action = defaultActions,
}) =>
  openConfirmModal({
    title: action.title,
    centered: true,
    children: <Text size="sm">{action.msg}</Text>,
    labels: action.labels,
    confirmProps: { color: "red" },
    // onCancel: () => console.log("dont delete!"),
    onConfirm: () => {
      if (from == "loat") {
        fn(type, item);
      } else if (from == "cuttingtype") {
        fn(true, item);
      } else if (from == "multiDeleteLoats") {
        fn();
      }
      ReactToast("success", "Deleted Successfully  !");
    },
  });
