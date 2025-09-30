import { getApiData } from "@/apiServices/apiServices";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => getApiData("/tasks"),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error };
};
