import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import _ from "lodash";
import { ReactToast } from "../components";

export const getUniqueId = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
};

const defaultActions = {
  labels: { confirm: "Delete", cancel: "No" },
  title: "Delete",
  msg: "Are you sure you want to delete!",
};

export const SetLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
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

/*
 * Compare two objects by reducing an array of keys in obj1, having the
 * keys in obj2 as the intial value of the result. Key points:
 *
 * - All keys of obj2 are initially in the result.
 *
 * - If the loop finds a key (from obj1, remember) not in obj2, it adds
 *   it to the result.
 *
 * - If the loop finds a key that are both in obj1 and obj2, it compares
 *   the value. If it's the same value, the key is removed from the result.
 */

export const getObjectDiff = (obj1, obj2) => {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key);
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));

  return diff;
};

// SAME WILL BE MISSING IN RESULT
export const diff = (obj1, obj2) => {
  return _.reduce(
    obj1,
    (result, value, key) => {
      if (_.isPlainObject(value)) {
        if (obj2[key]) {
          const newVal = diff(value, obj2[key]);
          if (!_.isEmpty(newVal)) {
            result[key] = newVal;
          }
        } else {
          // For New Multi Obj which is for new cuting types
          if (result.newObj) {
            result["newObj"] = [...result.newObj, value];
          } else {
            result["newObj"] = [value];
          }
        }
      } else if (!_.isEqual(value, obj2[key]) && !["c_price", "updatedat"].includes(key)) {
        result[key] = value;
      } else if (["c_price"].includes(key)) {
        if (parseFloat(value).toFixed(2) != parseFloat(obj2[key]).toFixed(2))
          result[key] = value;
      } else if (["c_id"].includes(key)) {
        result[key] = value;
      }
      return result;
    },
    {}
  );
};
