import axios from "axios";

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
      baseURL: "https://mfc-nogod-server.vercel.app",
    });
    return axiosPublic;
};

export default useAxiosPublic;