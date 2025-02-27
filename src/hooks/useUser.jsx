import { useQuery } from '@tanstack/react-query';
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: userInfo, isLoading: userLoading, error: userError, refetch } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User ID not found');
      const res = await axiosPublic.get(`/user/${user.id}`);
      return res.data;
    },
    enabled: !!user?.id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 2,
    staleTime: 0, // Mark data as stale immediately
    cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return { userInfo, userLoading, userError, refetch };
};

export default useUser;
