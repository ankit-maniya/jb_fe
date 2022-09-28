/* eslint-disable react/display-name */
import useStyles from "./style";
import { forwardRef, useEffect, useRef, useState } from "react";

import {
  Text,
  Select,
  Grid,
  NumberInput,
  Button,
  Checkbox,
  UnstyledButton,
  Indicator,
  Group,
  ActionIcon,
  // FocusTrap,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconPencil, IconTrash } from "@tabler/icons";

import { HeaderCT, MantineGridTable } from "../../components";

import { partyData, cuttingTypeData } from "../../utils/dummydata";
import { tblHomeColumns } from "../../utils";
import { getUniqueId, openDeleteModal } from "../../helpers";

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

const Home = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 755px)");

  const [loading, setLoading] = useState(false);
  const [isUpdateId, setIsUpdateId] = useState(false);
  const [tblData, setTblData] = useState([]);

  useEffect(() => {
    // const fetchData = () => {
    //   setLoading(true);
    //   setTblData([]);
    //   setLoading(false);
    // };
    // fetchData();
  }, []);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      partyid: "",
      l_cuttingtype_id: "",
      l_entrydate: new Date(),
      l_price: 0,
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

  const handleSubmit = (values) => {
    setLoading(true);

    if (values.partyid) {
      values.party = partyData.find((d) => d.id == values.partyid);
      values.partyName = values.party.p_name;
    }

    if (values.l_cuttingtype_id) {
      values.l_cuttingtype = cuttingTypeData.find(
        (d) => d.c_id == values.l_cuttingtype_id
      );
      values.cuttingName = values.l_cuttingtype.c_name;
    }

    if (!isUpdateId) {
      values.id = getUniqueId();
      setTblData([...tblData, values]);
    } else {
      const findIndex = tblData.findIndex((d) => d.id == isUpdateId);
      values.id = isUpdateId;
      tblData[findIndex] = values;
      setTblData([...tblData]);
      resetUpdateForm();
    }
    setLoading(false);
  };

  const handleEditRow = (type, values) => {
    if (type == "edit") {
      const valueObj = {
        partyid: values.partyid,
        l_cuttingtype_id: values.l_cuttingtype_id,
        l_entrydate: values.l_entrydate,
        l_price: values.l_price,
        l_numofdimonds: values.l_numofdimonds,
        l_weight: values.l_weight,
        l_multiwithdiamonds: values.l_multiwithdiamonds,
      };

      form.setValues(valueObj);
      setIsUpdateId(values.id);
    }

    if (type == "remove") {
      const data = tblData.filter((d) => d.id != values.id);
      setTblData([...data]);
    }
  };

  const resetUpdateForm = () => {
    form.reset();
    setIsUpdateId(null);
    // dimondRef.current.focus();
  };

  const tblColumns = [
    ...tblHomeColumns,
    {
      accessorKey: "Operations",
      size: 100,
      cell: (cell) => {
        return (
          // <>
          //   <IconPencil
          //     onClick={() => {
          //       handleEditRow("edit", cell.row.original);
          //     }}
          //   />
          //   <IconTrash
          //     onClick={() => {
          //       handleEditRow("remove", cell.row.original);
          //     }}
          //   />
          // </>
          <Group spacing={0} position="center">
            <ActionIcon
              onClick={() => {
                handleEditRow("edit", cell.row.original);
              }}
            >
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => {
                openDeleteModal(
                  "loat",
                  handleEditRow,
                  "remove",
                  cell.row.original
                );
              }}
            >
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          </Group>
        );
      },
    },
  ];

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
    <>
      <HeaderCT />
      <div className={classes.innerLayout}>
        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values);
          })}
        >
          <Grid mx={15} justify="flex-end">
            <Button
              className={classes.redBtnStyle}
              onClick={() => {
                resetUpdateForm();
              }}
              mr="xs"
            >
              Reset
            </Button>
            <Button
              className={classes.redBtnStyle}
              onClick={() => {
                console.log("upload to server");
              }}
            >
              Save
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
                onChange={(key) => {
                  form.setFieldValue("partyid", key);
                }}
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
                // onChange={(value) => form.setFieldValue("l_price", value)}
                // error={form.errors.l_price && form.errors.l_price}
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
                ref={dimondRef}
                label="Dimond Count"
                placeholder="0"
                value={form.values.l_numofdimonds}
                onChange={(value) =>
                  form.setFieldValue("l_numofdimonds", value)
                }
                error={form.errors.l_numofdimonds && form.errors.l_numofdimonds}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col md={6} lg={2}>
              <NumberInput
                precision={2}
                label="Weight"
                placeholder="0.0"
                value={form.values.l_weight}
                onChange={(value) => form.setFieldValue("l_weight", value)}
                error={form.errors.l_weight && form.errors.l_weight}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col md={6} lg={2} className={classes.addBtn}>
              <Button fullWidth type="submit" className={classes.redBtnStyle}>
                {isUpdateId ? "Update" : "Add"}
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </div>
      <MantineGridTable
        data={tblData}
        loading={loading}
        tableCoumns={tblColumns}
      />
    </>
  );
};

export default Home;
