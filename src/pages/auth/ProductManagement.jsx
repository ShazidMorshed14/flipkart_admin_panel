import {
  ActionIcon,
  Button,
  Flex,
  Loader,
  Pagination,
  Select,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconDatabase,
  IconFileExport,
  IconPlus,
  IconRefresh,
} from "@tabler/icons-react";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import SearchInput from "../../components/Global/SearchInput";
import { fetchCategoriesList } from "../../services/categories";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/products";
import ServerErrorBox from "../../components/Global/ServerErrorBox";
import ShowItems from "../../components/Global/ShowItems";
import ProductTable from "../../components/Tables/ProductTable";

const ProductManagement = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState(null);
  const [sku, setSku] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState(null);
  const [category, setCaytegory] = useState(null);

  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  const handleName = (value) => {
    setPage(1);
    setName(value);
  };

  const handleSku = (value) => {
    setPage(1);
    setSku(value);
  };

  const handlePageSize = (value) => {
    setPage(1);
    setPageSize(value);
  };

  const handleRefresh = () => {
    setPage(1);
    setInvokingRefreshForSearchInput(!invokingRefreshForSearchInput);
    setName("");
    setSku("");
  };

  const handleRefreshLocal = () => {
    setPage(1);
    setPageSize(10);
    setStatus(null);
    setCaytegory(null);
    setName(null);
    setSku(null);
    handleRefresh();
  };

  //fetching products only
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["product", page, pageSize, name, sku, status, category],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  //fetching categories list
  const {
    data: categoryList,
    isLoading: categoriesLoading,
    error: categoriesError,
    isFetching: categoriesFetching,
    refetch: categoriesRefetch,
  } = useQuery({
    queryKey: ["fetch-categories-list"],
    queryFn: fetchCategoriesList,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading)
    return (
      <div>
        <Flex w="100%" justify="space-between" align="center" my="sm">
          <Text weight="bold" fz="md" color={COLORS.fontPrimary}>
            Product Management
          </Text>
          <Flex gap={10}>
            <Button
              //onClick={() => setAddCategoryModal(true)}
              className="primary_btn"
              leftIcon={<IconPlus />}
              size="xs"
            >
              Add Product
            </Button>
            <Button
              //onClick={() => setAddCategoryModal(true)}
              className="primary_btn"
              leftIcon={<IconDatabase />}
              size="xs"
              color="orange"
            >
              Export Products
            </Button>
          </Flex>
        </Flex>
        <Stack
          sx={{
            minHeight: "80vh",
          }}
          justify="center"
          align="center"
        >
          <Loader size="md" variant="oval" color="white" />
        </Stack>
      </div>
    );

  if (error)
    return (
      <div>
        <ServerErrorBox apiError={true} />
      </div>
    );

  const { products, total } = data.data.data;

  return (
    <div>
      <Flex w="100%" justify="space-between" align="center" my="sm">
        <Text weight="bold" fz="md" color={COLORS.fontPrimary}>
          Product Management
        </Text>
        <Flex gap={10}>
          <Button
            //onClick={() => setAddCategoryModal(true)}
            className="primary_btn"
            leftIcon={<IconPlus />}
            size="xs"
          >
            Add Product
          </Button>
          <Button
            //onClick={() => setAddCategoryModal(true)}
            className="primary_btn"
            leftIcon={<IconDatabase />}
            size="xs"
            color="orange"
          >
            Export Products
          </Button>
        </Flex>
      </Flex>

      <Flex justify="space-between" align="center" py="sm">
        <Flex gap={20}>
          <SearchInput
            handleRefresh={() => setName(null)}
            handleSearch={handleName}
            placeholder="Search Name"
            invokeRefresh={invokingRefreshForSearchInput}
            refreshBtn={false}
          />

          <SearchInput
            handleRefresh={() => setName(null)}
            handleSearch={handleSku}
            placeholder="Search SKU"
            invokeRefresh={invokingRefreshForSearchInput}
            refreshBtn={false}
          />

          <Select
            value={status}
            onChange={(value) => {
              setPage(1);
              setStatus(value);
            }}
            placeholder="Status"
            data={[
              { label: "Active", value: "active" },
              { label: "Deactive", value: "deactive" },
            ]}
          />

          <Select
            value={category}
            disabled={categoriesLoading}
            searchable
            onChange={(value) => {
              setPage(1);
              setCaytegory(value);
            }}
            placeholder="Category"
            data={categoryList?.data?.data.map((cat) => {
              return {
                label: cat.name,
                value: cat._id,
              };
            })}
          />

          <Flex gap={20} align="center" justify="center">
            <Tooltip label="Refresh">
              <ActionIcon
                size="lg"
                onClick={handleRefreshLocal}
                sx={{
                  backgroundColor: COLORS.orange,
                }}
                variant="filled"
              >
                <IconRefresh size={18} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>

      <>
        {isFetching ? (
          <>
            <Stack
              sx={{
                minHeight: "75vh",
              }}
              justify="center"
              align="center"
            >
              <Loader size="md" variant="oval" color="white" />
            </Stack>
          </>
        ) : (
          <>
            <ProductTable
              data={products}
              //handleSelectItem={handleSelectItem}
              //handleAssignPlatoformDrawer={handleAssignPlatoformDrawer}
            />
            <Flex justify="space-between" align="center">
              <ShowItems
                mt="20px"
                handlePageSize={handlePageSize}
                pageSize={pageSize}
              />
              <Pagination
                mt="20px"
                value={page}
                onChange={setPage}
                total={Math.ceil(total / (pageSize ? pageSize : 10))}
              />
            </Flex>
          </>
        )}
      </>
    </div>
  );
};

export default ProductManagement;
