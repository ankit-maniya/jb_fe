import { Badge } from "@mantine/core";
import {
  booleanFilterFn,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from "mantine-data-grid";

export const tblHomeColumns = [
  {
    accessorKey: "id",
    header: "Index",
    size: 100,
    cell: (cell) => {
      return cell.row.index + 1;
    },
  },
  {
    accessorKey: "l_entrydate",
    header: "Date",
    filterFn: dateFilterFn,
    cell: (cell) => {
      return cell.getValue() && cell.getValue()?.toLocaleDateString("es-CL");
    },
  },
  {
    accessorKey: "partyName",
    header: "Party name",
    filterFn: stringFilterFn,
    size: 250,
    cell: highlightFilterValue,
  },
  {
    accessorKey: "l_numofdimonds",
    header: "Dimonds",
    filterFn: numberFilterFn,
  },
  {
    accessorKey: "l_weight",
    header: "Weight",
    filterFn: numberFilterFn,
  },
  {
    accessorKey: "cuttingName",
    header: "Cutting Type",
    filterFn: stringFilterFn,
    cell: highlightFilterValue,
  },
  {
    accessorKey: "l_price",
    header: "Price",
    filterFn: numberFilterFn,
  },
  {
    accessorKey: "l_multiwithdiamonds",
    header: "Payment Type",
    cell: (cell) => {
      if (cell.getValue()) {
        return <Badge color="teal">Dimond</Badge>;
      }
      return <Badge color="red">Weight</Badge>;
    },
    filterFn: booleanFilterFn,
  }
];
