import { getApiData } from "@/apiServices/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getApiData("/categories"),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, isError };
};
