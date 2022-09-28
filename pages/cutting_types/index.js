import { Button, Grid, Text } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import {
  CuttingTypeModal,
  CuttingTypeTable,
  HeaderCT,
  ReactToast,
} from "../../components";
import useStyles from "./style";

const CuttingType = (props) => {
  const [openModel, setModelOpen] = useState(false);
  const [cuttypeData, setCuttypeData] = useState([]);
  const [isCTUpdateObj, setIsCTUpdateObj] = useState(null);
  const { classes } = useStyles();

  const upCuttypeArr = cuttypeData.filter((d, idx) => (d.id = idx + 1));

  const resetPartyForm = () => {
    form.reset();
    // setPTUpdateObj(null);
    setCuttypeData([]);
  };

  const handleLoatTypeSubmit = (values) => {
    if (isCTUpdateObj) {
      const upData = cuttypeData;
      const upidx = upData.findIndex((d) => d.id == isCTUpdateObj.id);
      upData[upidx] = { ...values, id: isCTUpdateObj.id };
      setCuttypeData([...upData]);
      setIsCTUpdateObj(null);
      ReactToast("success", "Cutting Type updated!");
      return;
    }

    setCuttypeData([...cuttypeData, values]);
    ReactToast("success", "Cutting Type Added!");
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
    console.log("cuttypeData :: ", cuttypeData);
    ReactToast("success", "Party added!");
    resetPartyForm();
  };

  return (
    <>
      <HeaderCT title="Cutting Type" />
      <div className={classes.innerLayout}>
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
        <CuttingTypeTable
          data={upCuttypeArr}
          handleEditCutType={(isDel, item) => handleEditCutType(isDel, item)}
        />

        {/* Display Cutting Type Modal */}
        <CuttingTypeModal
          openModel={openModel}
          isUpdateObj={isCTUpdateObj}
          setIsUpdateObj={setIsCTUpdateObj}
          setModelOpen={setModelOpen}
          handleSubmit={(val) => handleLoatTypeSubmit(val)}
        />
      </div>
    </>
  );
};

export default CuttingType;
