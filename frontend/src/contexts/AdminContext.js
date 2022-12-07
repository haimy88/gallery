import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AdminContext = React.createContext();

export function useAdminContext() {
  return useContext(AdminContext);
}

export function AdminContextProvider({ children }) {
  const [allUsersAdmin, setAllUsersAdmin] = useState([]);

  const addUser = async (newUser) => {
    try {
      {
        const res = await axios.post(
          "http://localhost:8080/admin/add",
          newUser
        );
        console.log(res);
      }
    } catch (err) {
      return { error: err };
    }
  };

  const editUser = async (editedUser) => {
    try {
      const res = await axios.put(
        "http://localhost:8080/admin/edit",
        editedUser
      );
      console.log(res);
    } catch (err) {
      return { error: err };
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/admin/delete/${id}`
      );
      console.log(res);
    } catch (err) {
      return { error: err };
    }
  };

  const collectUsersAdmin = async (id) => {
    try {
      const userData = await axios.get("http://localhost:8080/admin/users");
      if (userData) {
        setAllUsersAdmin(userData.data);
      }
    } catch (err) {
      return { error: err };
    }
  };

  return (
    <AdminContext.Provider
      value={{
        addUser,
        editUser,
        deleteUser,
        collectUsersAdmin,
        allUsersAdmin,
        setAllUsersAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
