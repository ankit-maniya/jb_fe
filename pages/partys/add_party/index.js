/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import {
  Button,
  Divider,
  Grid,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCirclePlus } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import {
  CuttingTypeModal,
  CuttingTypeTable,
  HeaderCT,
  ReactToast,
} from "../../../components";
import { cuttingTypeData, partyData } from "../../../utils/dummydata";
import useStyles from "./style";

const AddParty = ({ updateId }) => {
  const router = useRouter();
  const updatePartyId = updateId;
  const [openModel, setModelOpen] = useState(false);
  const [cuttypeData, setCuttypeData] = useState([]);
  const [isCTUpdateObj, setIsCTUpdateObj] = useState(null);
  const { classes } = useStyles();

  const upCuttypeArr = cuttypeData.filter((d, idx) => (d.id = idx + 1));

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      p_name: "",
      p_billingname: "",
      p_mobile: 0,
    },

    validate: {
      p_name: (val) =>
        !val || (val && val.length <= 0) ? "Party Name Required!" : null,
      p_billingname: (val) =>
        !val || (val && val.length <= 0)
          ? "Party Billing Name Required!"
          : null,
      p_mobile: (val) =>
        !val || (val && val.length <= 10) ? "Party Mobile Required!" : null,
    },
  });

  useEffect(() => {
    if (updatePartyId) {
      const party = partyData.find((d) => d.id == updatePartyId);

      if (!party) {
        router.push("/error");
        return;
      }

      const cuttingType = cuttingTypeData.filter(
        (ct) => ct.partyid == updatePartyId
      );

      setCuttypeData(cuttingType);
      if (party.p_mobile) {
        party.p_mobile = parseInt(party.p_mobile);
      }

      form.setValues(party);
    }
  }, [updatePartyId]);

  const resetPartyForm = () => {
    if (updatePartyId) return;

    form.reset();
    setCuttypeData([]);
  };

  const handleLoatTypeSubmit = (values) => {
    if (isCTUpdateObj) {
      const upData = cuttypeData;
      const upidx = upData.findIndex((d) => d.id == isCTUpdateObj.id);
      upData[upidx] = { ...values, id: isCTUpdateObj.id };
      setCuttypeData([...upData]);
      setIsCTUpdateObj(null);
      return;
    }

    setCuttypeData([...cuttypeData, values]);
  };

  const handleEditCutType = (isDelete, item) => {
    if (isDelete) {
      const upCutTypes = cuttypeData.filter((d) => d.id != item.id);
      setCuttypeData([...upCutTypes]);
      return;
    }

    setIsCTUpdateObj(item);
    setModelOpen(true);
  };

  const handlePartySubmit = (values) => {
    console.log("isUpdateParty with Cuttingtype", updatePartyId);
    console.log("cuttypeData :: ", cuttypeData);
    console.log("party :: ", values);
    ReactToast("success", "Party " + (updatePartyId ? "updated!" : "added!"));
    resetPartyForm();
  };

  return (
    <>
      <HeaderCT />
      <div className={classes.innerLayout}>
        <form
          onSubmit={form.onSubmit((values) => {
            handlePartySubmit(values);
          })}
        >
          <Grid mx={10} justify="flex-end">
            <Button
              className={classes.redBtnStyle}
              onClick={() => {
                resetPartyForm();
              }}
              mr="xs"
            >
              Reset
            </Button>
            <Button type="submit" className={classes.redBtnStyle}>
              {updatePartyId ? "Update" : "Add"} Party
            </Button>
          </Grid>
          <Grid mx={0} grow>
            <Grid.Col>
              <TextInput
                label="Enter Party Name"
                placeholder="ex: Bhaveshbhai"
                {...form.getInputProps("p_name")}
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col>
              <TextInput
                label="Enter Billing Name"
                placeholder="ex: Jaybhagawati LTD"
                {...form.getInputProps("p_billingname")}
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col>
              <NumberInput
                maxLength={10}
                label="Enter Party Mobile"
                placeholder="ex: 9913079272"
                {...form.getInputProps("p_mobile")}
                withAsterisk
              />
            </Grid.Col>
          </Grid>
        </form>
      </div>
      <Divider size="xs" mb={30} />
      <div className={classes.m}>
        <Grid mx={10} justify="space-between">
          <Text weight={500} size="lg">
            Laser Rate
          </Text>

          <Button
            leftIcon={<IconCirclePlus size={26} />}
            onClick={() => setModelOpen(true)}
          >
            Add Loat
          </Button>
        </Grid>
      </div>

      {/* Display Cutting Type Data */}
      <div className={classes["m-xs"]}>
        <CuttingTypeTable
          data={upCuttypeArr}
          handleEditCutType={(isDel, item) => handleEditCutType(isDel, item)}
        />
      </div>

      {/* Display Cutting Type Modal */}
      <CuttingTypeModal
        openModel={openModel}
        isUpdateObj={isCTUpdateObj}
        setIsUpdateObj={setIsCTUpdateObj}
        setModelOpen={setModelOpen}
        handleSubmit={(val) => handleLoatTypeSubmit(val)}
      />
    </>
  );
};

export default AddParty;
