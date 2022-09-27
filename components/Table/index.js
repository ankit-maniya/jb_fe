import { useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import { useMediaQuery } from "@mantine/hooks";

import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPencil,
  IconTrash,
} from "@tabler/icons";

import useStyles from "./style";
import Link from "next/link";

const Th = ({
  key,
  children,
  reversed,
  sorted,
  onSort,
  customClass,
  showIcon = true,
}) => {
  const { classes } = useStyles();

  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th key={key} className={`${classes.th} ${customClass}`}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          {showIcon && (
            <Center className={classes.icon}>
              <Icon size={14} stroke={1.5} />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </th>
  );
};

const filterData = (data, search, numberFields = []) => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    return keys(data[0]).some((key) => {
      const isNumber = numberFields.includes(key);

      if (isNumber) {
        item[key] = item[key].toString();
      }

      return item[key].toLowerCase().includes(query);
    });
  });
};

const sortData = (data, payload, numberFields) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search, numberFields);
  }

  const isNumber = numberFields.includes(sortBy);

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        if (isNumber) {
          return b[sortBy] - a[sortBy];
        }

        return b[sortBy].localeCompare(a[sortBy]);
      }

      if (isNumber) {
        return a[sortBy] - b[sortBy];
      }
      a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search,
    numberFields
  );
};

export const SimpleTable = ({ data, tblObj }) => {
  const isMobile = useMediaQuery("(max-width: 755px)");

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { classes } = useStyles();
  const {
    numberFields = [],
    displayFields = [],
    fixedWidthColumn = [],
    showOperations = false,
  } = tblObj;

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(data, { sortBy: field, reversed, search }, numberFields)
    );
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(
        data,
        { sortBy, reversed: reverseSortDirection, search: value },
        numberFields
      )
    );
  };

  const getTableHeaders = () => {
    const headerObj = displayFields.map((item, key) => {
      return (
        <Th
          key={key}
          customClass={
            fixedWidthColumn.includes(item) ? classes.fixedWdth : null
          }
          sorted={sortBy === item}
          reversed={reverseSortDirection}
          onSort={() => setSorting(item)}
        >
          {item.toUpperCase()}
        </Th>
      );
    });

    showOperations &&
      headerObj.push(
        <Th key="operation" customClass={classes.fixedWdth} showIcon={false}>
          Operations
        </Th>
      );

    return headerObj;
  };

  const addTableRow = (headers, row) => {
    return (
      <tr key={row.id}>
        {headers.map((h, key) => {
          return (
            <td key={key} className={!isMobile && classes.centerText}>
              {row[h]}
            </td>
          );
        })}
        {showOperations && (
          <td className={classes.centerText}>
            <Group spacing={0} position="center">
              <Link
                href={{
                  pathname: "/partys/add_party/[partyid]",
                  query: { partyid: row.id },
                }}
              >
                <ActionIcon>
                  <IconPencil size={16} stroke={1.5} />
                </ActionIcon>
              </Link>
              <ActionIcon
                color="red"
                onClick={() => {
                  alert("Helo");
                }}
              >
                <IconTrash size={16} stroke={1.5} />
              </ActionIcon>
            </Group>
          </td>
        )}
      </tr>
    );
  };

  const getTableBody = (sortedData) => {
    return sortedData.map((row, key) => {
      return addTableRow(displayFields, row);
    });
  };

  return (
    <>
      <TextInput
        placeholder="Search Party"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea>
        <Table
          striped
          highlightOnHover
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: "fixed", minWidth: 365 }}
        >
          <thead>
            <tr>{getTableHeaders()}</tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              getTableBody(sortedData)
            ) : (
              <tr>
                <td colSpan={displayFields.length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
};
