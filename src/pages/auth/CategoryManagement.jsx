import { Button, Flex, Loader, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import COLORS from "../../constants/colors";
import { IconPlus } from "@tabler/icons-react";
import { fetchCategoriesPageless } from "../../services/categories";
import ServerErrorBox from "../../components/Global/ServerErrorBox";
import { isArrayAndHasContent } from "../../utils/utils";

const CategoryManagement = () => {
  //fetching patient only
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["fetch-categories-pageless"],
    queryFn: fetchCategoriesPageless,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading)
    return (
      <div className="card">
        <div className="card-body">
          <Flex w="100%" justify="space-between" align="center" my="sm">
            <Text weight="bold" fz="md" color={COLORS.fontPrimary}>
              Category Management
            </Text>
            <Flex gap={10}>
              <Button className="primary_btn" leftIcon={<IconPlus />} size="xs">
                Add Category
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
      </div>
    );

  if (error)
    return (
      <div>
        <ServerErrorBox apiError={true} />
      </div>
    );

  const { data: categoryData } = data?.data;

  //render categories in list
  const renderCategories = (categories) => {
    let myCategories = [];

    for (let category of categories) {
      myCategories.push(
        <li key={category._id}>
          {category.name}
          {isArrayAndHasContent(category.children) && (
            <ul>{renderCategories(category.children)}</ul>
          )}
        </li>
      );
    }

    return myCategories;
  };

  return (
    <div>
      <Flex w="100%" justify="space-between" align="center" my="sm">
        <Text weight="bold" fz="md" color={COLORS.fontPrimary}>
          Category Management
        </Text>
        <Flex gap={10}>
          <Button
            //onClick={addDrawerOpen}
            className="primary_btn"
            leftIcon={<IconPlus />}
            size="xs"
          >
            Add Category
          </Button>
        </Flex>
      </Flex>

      <div>
        <ul>{renderCategories(categoryData)}</ul>
      </div>
    </div>
  );
};

export default CategoryManagement;
