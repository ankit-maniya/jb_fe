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
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";

import useStyles from "./style";

import {
  CuttingTypeModal,
  CuttingTypeTable,
  HeaderCT,
  ReactToast,
} from "../../../components";
import { diff } from "../../../helpers";

import {
  editParty,
  editCuttingType,
  updateCuttingTypeObj,
} from "../../../redux/reducers/party";

import CuttingTypeService from "../../../services/cuttingType.service";
import { toast } from "react-toastify";

const AddParty = ({ updateId }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const updatePartyId = updateId;
  const iResParty = useSelector((state) => state.partys);
  const iParty = cloneDeep(iResParty);
  const partyArr = iParty.data;
  const pTOrignalUpdateObj = iParty.editParty;
  const ctOrignalUpdateObj = iParty.editCuttingType;

  console.log('iResParty :: ', iResParty);

  const [openModel, setModelOpen] = useState(false);
  const [cuttypeData, setCuttypeData] = useState([]);
  const [isCTUpdateObj, setIsCTUpdateObj] = useState(null);

  const { classes } = useStyles();

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

  const getCuttingTypes = async (partyId) => {
    const cuttingType = await CuttingTypeService.getByParam({
      params: { partyid: partyId },
    });

    // const cuttingData = cuttingType.filter((d, idx) => (d.id = idx + 1));

    setCuttypeData(cuttingType);
    dispatch(editCuttingType(cuttingType));
  };

  useEffect(() => {
    if (!updatePartyId) return;

    const party = partyArr.find((d) => d.id == updatePartyId);

    if (!party) {
      router.push("/error");
      return;
    }

    getCuttingTypes(party.id);

    if (party.p_mobile) {
      party.p_mobile = parseInt(party.p_mobile);
    }

    dispatch(editParty(party));
    form.setValues(party);
  }, [updatePartyId]);

  const resetPartyForm = () => {
    if (updatePartyId) return;

    form.reset();
    dispatch(editCuttingType([]));
    setCuttypeData([]);
  };

  const handleLoatTypeSubmit = (values) => {
    if (!isCTUpdateObj) {
      setCuttypeData([...cuttypeData, values]);
      return;
    }

    const upData = cloneDeep(cuttypeData);
    const upidx = upData.findIndex((d) => d.c_id == isCTUpdateObj.c_id);
    upData[upidx] = { ...values, c_id: isCTUpdateObj.c_id };
    setCuttypeData([...upData]);
    setIsCTUpdateObj(null);
  };

  const handleEditCutType = (isDelete, item) => {
    if (isDelete) {
      const upCutTypes = cuttypeData.filter((d) => d.c_id != item.c_id);
      setCuttypeData([...upCutTypes]);
      dispatch(editCuttingType([...upCutTypes]));
      return;
    }

    setIsCTUpdateObj(cloneDeep(item));
    setModelOpen(true);
  };

  const handlePartySubmit = async (values) => {
    console.log("isUpdateParty with Cuttingtype", updatePartyId);
    if (updatePartyId) {
      const finalParty = diff(values, pTOrignalUpdateObj);

      let finalCuttingType = diff(cuttypeData, ctOrignalUpdateObj);
      console.log(cuttypeData, ctOrignalUpdateObj);
      const newCuttingObj = finalCuttingType.newObj;

      finalCuttingType = Object.values(finalCuttingType);
      finalCuttingType = finalCuttingType.filter(
        (d) => Object.keys(d).length > 1
      );

      const fLength = finalCuttingType.length;
      const upArr = [];
      if (fLength) {
        for (let i = 0; i <= fLength; i++) {
          const catId = finalCuttingType[i]?.c_id;
          delete finalCuttingType[i]?.c_id;

          if (catId) {
            console.log('catId :: ', catId);
            const id = toast.loading("Please wait...");
            const data = await CuttingTypeService.patch(
              catId,
              finalCuttingType[i]
            );

            upArr.push(data);

            toast.update(id, {
              render: "All is good",
              type: "success",
              isLoading: false,
              autoClose: true,
              closeOnClick: true,
            });
          }
        }

        if (upArr.length) {
          console.log("upArr : ", upArr);
          dispatch(updateCuttingTypeObj(upArr));
        }
      }
    }

    ReactToast("success", "Party " + (updatePartyId ? "updated!" : "added!"));
    resetPartyForm();
  };

  return (
    <>
      <HeaderCT title={`${updatePartyId ? "Update" : "Add"} Party`} />
      <div className={classes.innerLayout}>
        <form
          onSubmit={form.onSubmit((values) => {
            handlePartySubmit(values);
          })}
        >
          <Grid mx={10} justify="flex-end">
            {!updatePartyId && (
              <Button
                className={classes.redBtnStyle}
                onClick={() => {
                  resetPartyForm();
                }}
                mr="xs"
              >
                Reset
              </Button>
            )}
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
            Add Cuttingtype
          </Button>
        </Grid>
      </div>

      {/* Display Cutting Type Data */}
      <div className={classes["m-xs"]}>
        <CuttingTypeTable
          data={cuttypeData}
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
