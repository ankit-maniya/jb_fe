/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  ColorInput,
  Grid,
  Modal,
  NumberInput,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import useStyles from "./style";

export const CuttingTypeModal = ({
  isUpdateObj,
  setIsUpdateObj,
  openModel,
  setModelOpen,
  handleSubmit,
}) => {
  const { classes } = useStyles();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      c_name: "",
      c_price: "",
      c_colorcode: "#ffffff",
      c_multiwithdiamonds: false,
    },

    validate: {
      c_name: (val) =>
        !val || (val && val.length <= 0) ? "Cutting Type Required!" : null,
      c_price: (val) =>
        !val || (val && val.length <= 0) ? "Cutting Price Required!" : null,
    },
  });

  useEffect(() => {
    if (isUpdateObj) {
      console.log("isUpdateObj :: ", isUpdateObj);

      if (!isUpdateObj.c_colorcode) {
        delete isUpdateObj.c_colorcode;
      }

      isUpdateObj.c_price = parseFloat(isUpdateObj.c_price);

      form.setValues(isUpdateObj);
    }
  }, [isUpdateObj]);

  const resetUpdateForm = () => {
    form.reset();
    setModelOpen(false);
    setIsUpdateObj(null);
  };

  return (
    <Modal
      opened={openModel}
      onClose={() => {
        resetUpdateForm();
      }}
      title={`${isUpdateObj ? "Update" : "Add"} Cutting type`}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
          resetUpdateForm();
        })}
      >
        <Grid mx={0} mb={20} grow>
          <Grid.Col>
            <TextInput
              label="Enter Cutting Type"
              placeholder="ex: LASER"
              {...form.getInputProps("c_name")}
              withAsterisk
            />
          </Grid.Col>

          <Grid.Col>
            <NumberInput
              precision={2}
              label="Rate ₹"
              placeholder=""
              {...form.getInputProps("c_price")}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col>
            <ColorInput
              placeholder="Pick color"
              label="Your favorite color"
              {...form.getInputProps("c_colorcode")}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col>
            <Text weight={500}> Payment Option </Text>
            <UnstyledButton className={classes.ckBoxBen}>
              <Checkbox
                {...form.getInputProps("c_multiwithdiamonds", {
                  type: "checkbox",
                })}
                label="Payment With Dimond"
              />
            </UnstyledButton>
          </Grid.Col>
        </Grid>
        <Grid mx={10} justify="flex-end">
          <Button
            type="submit"
            className={classes.redBtnStyle}
            onClick={() => {}}
            mr="xs"
          >
            Save
          </Button>
          <Button
            className={classes.redBtnStyle}
            onClick={() => {
              resetUpdateForm();
            }}
          >
            Cancle
          </Button>
        </Grid>
      </form>
    </Modal>
  );
};
