import { Grid } from "@mantine/core";
import { DataGrid } from "mantine-data-grid";
import useStyles from "./style";

export const MantineGridTable = ({
  loading,
  data,
  tableCoumns,
  withRowSelection = false,
  onRowSelectionChange,
  defaltState,
  withGlobalFilter=false
}) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.gridWrapper}>
      <Grid.Col p="md">
        <DataGrid
          id="DataGrid_oo1"
          data={data}
          withFixedHeader={true}
          noEllipsis={true}
          withGlobalFilter={withGlobalFilter}
          withPagination={true}
          withColumnFilters={true}
          withSorting={true}
          noFlexLayout={true}
          withColumnResizing={true}
          striped={true}
          highlightOnHover={true}
          withRowSelection={withRowSelection}
          state={{
            rowSelection: defaltState,
          }}
          onRowSelectionChange={onRowSelectionChange}
          loading={loading}
          // onRow={(row) => ({
          //   onClick: () => {
          //     console.log("row.id :: ", row.original.id);
          //   },
          // })}
          columns={tableCoumns}
        />
      </Grid.Col>
    </Grid>
  );
};
