import { useContext } from "react";
import { AuthContext } from "../authprovider/AuthProvider";


const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;