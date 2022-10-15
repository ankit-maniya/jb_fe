import { useState } from "react";
import { ActionIcon, Grid, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import { DateRangePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import keys from "lodash/keys";
import isEmpty from "lodash/isEmpty";

import useStyles from "./style";

import { HeaderCT, LoatEditModal, MantineGridTable } from "../../components";

import { cuttingTypeData, loatsArr, partyData } from "../../utils/dummydata";
import { openDeleteModal } from "../../helpers";
import { tblHomeColumns } from "../../utils";

const Dashboard = () => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const [openModel, setModelOpen] = useState(false);
  const [selectRow, setSelectedRow] = useState({});
  const [loatsData, setLoatsData] = useState(loatsArr || []);
  const [isLTUpdateObj, setLTUpdateObj] = useState(null);
  const [upId, setUpId] = useState(null);
  const isMobile = useMediaQuery("(max-width: 755px)");
  const [value, setValue] = useState([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);

  const handleEditRow = (type, values) => {
    if (type == "edit") {
      const valueObj = {
        partyid: values.partyid.id,
        l_cuttingtype_id: values.l_cuttingtype_id,
        l_entrydate: new Date(values.l_entrydate),
        l_price: parseFloat(values.l_price),
        l_numofdimonds: values.l_numofdimonds,
        l_weight: parseFloat(values.l_weight),
        l_multiwithdiamonds: values.l_multiwithdiamonds,
      };

      setUpId(values.id);
      setLTUpdateObj(valueObj);
      setModelOpen(true);
    }
    if (type == "remove") {
      const data = loatsData.filter((d) => d.id != values.id);
      setLoatsData([...data]);
    }
  };

  const handleMultiDelete = () => {
    const data = loatsData.filter(
      (d, idx) => !keys(selectRow).includes(`${idx}`)
    );

    setLoatsData([...data]);
    setSelectedRow({});
  };

  const handleLoatTypeSubmit = (values) => {
    setLTUpdateObj(null);
    setLoading(true);

    if (values.partyid) {
      values.partyid = partyData.find((d) => d.id == values.partyid);
      values.partyName = values.partyid.p_name;
    }

    if (values.l_cuttingtype_id) {
      values.l_cuttingtype = cuttingTypeData.find(
        (d) => d.c_id == values.l_cuttingtype_id
      );
      values.cuttingName = values.l_cuttingtype.c_name;
    }

    const findIndex = loatsData.findIndex((d) => d.id == upId);
    values.id = upId;
    loatsData[findIndex] = values;

    setLoatsData([...loatsData]);
    setLoading(false);
    setModelOpen(false);
  };

  const tblColumns = [
    ...tblHomeColumns,
    {
      accessorKey: "Operations",
      size: 100,
      cell: (cell) => {
        return (
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
                // openDeleteModal(
                //   "loat",
                //   handleEditRow,
                //   "remove",
                //   cell.row.original
                // );
                openDeleteModal({
                  from: "loat",
                  fn: handleEditRow,
                  type: "remove",
                  item: cell.row.original,
                });
              }}
            >
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          </Group>
        );
      },
    },
  ];

  const tblData = loatsData.map((d) => {
    d.partyName = d.partyid.p_name;

    if (typeof d.l_cuttingtype == "object") {
      d.cuttingName = d.l_cuttingtype.c_name;
    } else {
      let l_cuttingtype = cuttingTypeData.find(
        (cd) => cd.c_name == d.l_cuttingtype && cd.partyid == d.partyid.id
      );

      d.cuttingName = l_cuttingtype.c_name || "";
      d.l_cuttingtype_id = l_cuttingtype.c_id;
    }

    return d;
  });

  return (
    <>
      <HeaderCT
        title="All Loats"
        component={
          !isEmpty(selectRow) && (
            <Grid mx={10} justify="flex-end">
              <ActionIcon
                color="red"
                variant="light"
                onClick={() => {
                  // openDeleteModal("multiDeleteLoats", handleMultiDelete);
                  openDeleteModal({
                    from: "multiDeleteLoats",
                    fn: handleMultiDelete,
                  });
                }}
              >
                <IconTrash stroke={1.5} />
              </ActionIcon>
            </Grid>
          )
        }
      />
      <div className={classes.innerLayout}>
        <DateRangePicker
          dropdownType={isMobile ? "modal" : "popover"}
          mx={15}
          fullwidth="true"
          placeholder="Pick dates range"
          value={value}
          onChange={setValue}
        />
        <MantineGridTable
          data={tblData}
          onRowSelectionChange={setSelectedRow}
          defaltState={selectRow}
          loading={loading}
          tableCoumns={tblColumns}
          withRowSelection={true}
        />
      </div>
      {/* Display Cutting Type Modal */}
      <LoatEditModal
        openModel={openModel}
        isUpdateObj={isLTUpdateObj}
        setModelOpen={setModelOpen}
        handleSubmit={(val) => handleLoatTypeSubmit(val)}
      />
    </>
  );
};

export default Dashboard;
