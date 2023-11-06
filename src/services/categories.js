import axios from "./axios";

export const fetchCategoriesPageless = async (context) => {
  const response = await axios().get("/category", {
    params: {
      page: context.queryKey[1],
      pageSize: context.queryKey[2],
      pid: context.queryKey[3],
      name: context.queryKey[4],
      phone: context.queryKey[5],
      pageLess: context.queryKey[6],
    },
  });
  return response;
};
