/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  Grid,
  Indicator,
  Modal,
  NumberInput,
  Select,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cuttingTypeData, partyData } from "../../../utils/dummydata";
import useStyles from "./style";

export const LoatEditModal = ({
  isUpdateObj,
  openModel,
  setModelOpen,
  handleSubmit,
}) => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 755px)");

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      partyid: "",
      l_cuttingtype_id: "",
      l_entrydate: new Date(),
      l_price: 0.0,
      l_numofdimonds: 0,
      l_weight: 0.0,
      l_multiwithdiamonds: false,
    },

    validate: {
      partyid: (val) => (!val || (val && val.length <= 0) ? true : null),
      l_cuttingtype_id: (val) =>
        !val || (val && val.length <= 0) ? true : null,
      l_entrydate: (val) => (!val || (val && val.length <= 0) ? true : null),
      l_numofdimonds: (val) => (!val || (val && val.length <= 0) ? true : null),
      l_weight: (val) => (!val || (val && val.length <= 0) ? true : null),
    },
  });

  useEffect(() => {
    if (isUpdateObj) {
      form.setValues(isUpdateObj);
    }
  }, [isUpdateObj]);

  const resetUpdateForm = () => {
    // form.reset();
    setModelOpen(false);
  };

  const SelectPartyItem = forwardRef(({ label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Text size="sm">{label}</Text>
    </div>
  ));

  const SelectCuttingItem = forwardRef(({ label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Text size="sm">{label}</Text>
    </div>
  ));

  const filterPartyData = partyData.filter((d) => {
    d.label = d.p_name;
    d.value = d.id;
    return d;
  });

  const filterCuttingTypeData = cuttingTypeData.filter((d) => {
    d.label = d.c_name;
    d.value = d.c_id;
    return d;
  });

  const dimondRef = useRef(null);

  return (
    <Modal
      centered
      size="85%"
      opened={openModel}
      onClose={() => {
        resetUpdateForm();
      }}
      title="Update Loat"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
          resetUpdateForm();
        })}
      >
        <Grid mx={10} justify="flex-end">
          <Button
            type="submit"
            className={classes.redBtnStyle}
            onClick={() => {}}
            mr="xs"
          >
            Update
          </Button>
        </Grid>
        <Grid mx={5} grow>
          <Grid.Col md={6} lg={4}>
            <Select
              {...form.getInputProps("partyid")}
              label="Party Name"
              placeholder="Select Party Name"
              itemComponent={SelectPartyItem}
              data={filterPartyData}
              searchable
              clearable
              maxDropdownHeight={280}
              nothingFound="Nobody here"
              filter={(value, item) =>
                item.label
                  .toLowerCase()
                  .includes(value && value.toLowerCase().trim())
              }
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col md={6} lg={4}>
            <Select
              {...form.getInputProps("l_cuttingtype_id")}
              label="Cutting Type"
              placeholder="Select Cutting Type"
              itemComponent={SelectCuttingItem}
              data={filterCuttingTypeData}
              searchable
              clearable
              maxDropdownHeight={280}
              nothingFound="Nobody here"
              onChange={(key) => {
                form.setFieldValue("l_cuttingtype_id", key);

                if (!key) return;

                const cutType = cuttingTypeData.find((d) => d.c_id == key);
                console.log("cutType :: ", cutType);
                form.setFieldValue("l_price", parseFloat(cutType.c_price));
                form.setFieldValue(
                  "l_multiwithdiamonds",
                  cutType.c_multiwithdiamonds
                );
              }}
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim())
              }
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col md={6} lg={4}>
            <NumberInput
              disabled
              precision={2}
              label="Price"
              placeholder="0.0"
              value={form.values.l_price}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col md={6} lg={2}>
            <Text weight={500}> Payment Option </Text>
            <UnstyledButton disabled className={classes.ckBoxBen}>
              <Checkbox
                disabled
                {...form.getInputProps("l_multiwithdiamonds", {
                  type: "checkbox",
                })}
                label="Payment With Dimond"
              />
            </UnstyledButton>
          </Grid.Col>
          <Grid.Col md={6} lg={2}>
            <DatePicker
              dropdownType={isMobile ? "modal" : "popover"}
              {...form.getInputProps("l_entrydate")}
              placeholder="Pick date"
              label="Date"
              inputFormat="DD/MM/YYYY"
              labelFormat="DD/MM/YYYY"
              renderDay={(date) => {
                const day = date.getDate();
                return (
                  <Indicator
                    size={6}
                    color="red"
                    offset={8}
                    disabled={day !== new Date().getDate()}
                  >
                    <div>{day}</div>
                  </Indicator>
                );
              }}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col md={6} lg={2}>
            <NumberInput
              {...form.getInputProps("l_numofdimonds")}
              ref={dimondRef}
              label="Dimond Count"
              placeholder="0"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col md={6} lg={2}>
            <NumberInput
              {...form.getInputProps("l_weight")}
              precision={2}
              label="Weight"
              placeholder="0.0"
              withAsterisk
            />
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
};
