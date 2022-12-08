import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const login = async (user) => {
    try {
      const api = "http://localhost:8080/auth/login";
      const existingUser = await axios.post(api, user);
      if (existingUser) {
        localStorage.setItem("user", JSON.stringify(existingUser.data));
        setCurrentUser(existingUser.data);
        navigate("/home");
      }
    } catch (err) {
      return { error: err };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser("");
  };

  const collectUsers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      const headersConfig = {
        headers: { Authorization: "Bearer " + token },
      };
      const api = "http://localhost:8080/auth/allusers";
      const userData = await axios.get(api, headersConfig);
      if (userData) {
        setAllUsers(userData.data);
      }
    } catch (err) {
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        currentUser,
        collectUsers,
        allUsers,
        setAllUsers,
      }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
}
