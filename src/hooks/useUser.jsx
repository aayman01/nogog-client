import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useUser = () => {
  const { user } = useAuth(); 
  const axiosPublic = useAxiosPublic();
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        // Check if user and user.id exist
        try {
          const res = await axiosPublic.get(`/user/${user?.id}`);
          setUserInfo(res.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
          setUserError(error.message || "Failed to fetch user info.");
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserLoading(false);
      }
    };

    fetchUserInfo();
  }, [user]); 

  return { userInfo, userLoading, userError };
};

export default useUser;
