import {
  ActionIcon,
  Badge,
  Flex,
  HoverCard,
  Image,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import dayjs from "dayjs";
import React from "react";
import {
  isArrayAndHasContent,
  isObjectAndHasProperties,
} from "../../utils/utils";
import TableComponent from "../Global/TableComponent";
import {
  IconEdit,
  IconEye,
  IconListCheck,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ProductTable = ({
  data,
  handleSelectItem,
  handleAssignPlatoformDrawer,
}) => {
  const navigate = useNavigate();

  const ths = (
    <tr>
      <th>Name</th>
      <th>Images</th>
      <th>Category</th>
      <th>Price</th>
      <th>Status</th>
      <th>Created By</th>
      <th>Created At</th>
      <th>Last Update</th>
      <th>Action</th>
    </tr>
  );

  const rows = data.map((product, index) => (
    <tr key={index}>
      <td>
        <Stack
          sx={{
            maxWidth: "400px",
          }}
        >
          {product?.name ? (
            <Flex gap={5} align="center" wrap="wrap">
              <HoverCard key={index} maxWidth={500} shadow="md">
                <HoverCard.Target>
                  <Text fw={600}>{product?.name}</Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm" py="sm" fw={600}>
                    Name: {product?.name}
                  </Text>
                  <Flex gap={10} direction="column">
                    <Text color="orange" fw={600} fz="xs">
                      SKU: {product?.sku}
                    </Text>
                    <Text color="yellow" fw={600} fz="xs">
                      Slug: {product?.slug}
                    </Text>
                    <div>
                      <Text fw={600} py="xs">
                        Product Description:
                      </Text>
                      <div
                        style={{ maxWidth: "400px" }}
                        dangerouslySetInnerHTML={{
                          __html: product?.description,
                        }}
                      />
                    </div>
                  </Flex>
                </HoverCard.Dropdown>
              </HoverCard>
            </Flex>
          ) : (
            <Text c="dimmed">No Brand </Text>
          )}
        </Stack>
      </td>

      <td>
        <Stack
          sx={{
            maxWidth: "500px",
          }}
        >
          <Flex gap={10} wrap="wrap">
            {product?.productPictures.map((img, index) => {
              return (
                <Image src={img?.img} height={50} width={50} key={index} />
              );
            })}
          </Flex>
        </Stack>
      </td>

      <td>{product?.category?.name}</td>
      <td>
        <Text fw={600} fz="md" align="center">
          {product?.price || 0} BDT
        </Text>
      </td>
      <td>
        {product?.status == "active" ? (
          <Badge color="green" variant="filled">
            Active
          </Badge>
        ) : (
          <Badge color="red" variant="filled">
            Deactive
          </Badge>
        )}
      </td>
      <td>
        <Stack
          sx={{
            maxWidth: "400px",
          }}
        >
          {product?.createdBy ? (
            <Flex gap={5} align="center" wrap="wrap">
              <HoverCard key={index} maxWidth={500} shadow="md">
                <HoverCard.Target>
                  <Flex align="center" justify="center" gap={10}>
                    <IconUserCircle />
                    <Text>{product?.createdBy?.name}</Text>
                  </Flex>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Flex gap={20} justify="center" align="center">
                    <Text size="sm" py="sm" fw={600}>
                      {product?.createdBy?.name}
                    </Text>
                    <Badge color="blue" variant="filled">
                      {product?.createdBy?.role}
                    </Badge>
                  </Flex>
                </HoverCard.Dropdown>
              </HoverCard>
            </Flex>
          ) : (
            <Text c="dimmed">N/A </Text>
          )}
        </Stack>
      </td>
      <td>{dayjs(product?.createdAt).format("MMM DD, YYYY")}</td>
      <td>{dayjs(product?.updatedAt).format("MMM DD, YYYY")}</td>
      <td>
        <Flex gap={20} align="center">
          <Tooltip label={"Edit Product"}>
            <ActionIcon
              variant="light"
              color="teal"
              onClick={() => handleSelectItem(product)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={"Product Details"}>
            <ActionIcon
              variant="light"
              color="teal"
              onClick={() => handleSelectItem(product)}
            >
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </td>
    </tr>
  ));
  return (
    <>
      <TableComponent ths={ths} rows={rows} data={data} />
    </>
  );
};

export default ProductTable;
