/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosPublic
        .get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  const login = async (identifier, pin) => {
    // console.log(identifier,pin)
    try {
      const res = await axiosPublic.post("/login", { identifier, pin });
      const { token, user: loggedInUser } = res.data;
      localStorage.setItem("token", token); 
      setUser(loggedInUser);
      toast.success("Logged in successfully!");
      // navigate("/");
      return true; 
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Login failed.");
      } else {
        toast.error("An error occurred during login.");
      }
      return false; // Indicate failed login
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out.");
  };


  return (
    <AuthContext.Provider value={{ user, loading, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// export { AuthContext };
export default AuthProvider;

