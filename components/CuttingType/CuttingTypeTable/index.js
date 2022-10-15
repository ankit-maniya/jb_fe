import {
  Badge,
  Table,
  Group,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import { openDeleteModal } from "../../../helpers";

export const CuttingTypeTable = ({ data, handleEditCutType }) => {
  // const theme = useMantineTheme();
  const rows = data.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>
          <Button
            style={{
              background: item.c_colorcode,
              color: "white",
              outlineColor: item.c_colorcode,
              borderColor: item.c_colorcode,
            }}
          >
            {item.c_name}
          </Button>
          {/* <Badge
            // color={item.c_colorcode}
            variant={theme.colorScheme === "dark" ? "light" : "outline"}
          >
            {item.c_name}
          </Badge> */}
        </td>
        <td>{item.c_price}</td>
        <td>
          <Badge
            color={item.c_multiwithdiamonds ? "green" : "red"}
            // variant={theme.colorScheme === "dark" ? "light" : "outline"}
          >
            {item.c_multiwithdiamonds ? "Dimond" : "Weight"}
          </Badge>
        </td>
        <td>
          <Group spacing={0} position="center">
            <ActionIcon onClick={() => handleEditCutType(false, item)}>
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => {
                openDeleteModal({
                  from: "cuttingtype",
                  fn: handleEditCutType,
                  type: null,
                  item: item,
                });
                // openDeleteModal({"cuttingtype", handleEditCutType, null, item});
              }}
            >
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        sx={{ minWidth: 800 }}
        verticalSpacing="sm"
        striped
        highlightOnHover
      >
        <thead>
          <tr>
            <th align="center">Index</th>
            <th align="center">Cutting Type</th>
            <th align="center">Rate</th>
            <th align="center">Payment Option</th>
            <th align="center">Operations</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
