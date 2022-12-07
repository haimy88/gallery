import React, { useState, useContext, useEffect } from "react";
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
      const existingUser = await axios.post(
        "http://localhost:8080/auth/login",
        user
      );
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
    // window.location.pathname = "/";
  };

  const collectUsers = async () => {
    try {
      const userData = await axios.get("http://localhost:8080/auth/allusers");
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
