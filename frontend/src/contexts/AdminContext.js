import React, { useState, useContext } from "react";
import axios from "axios";

const AdminContext = React.createContext();

export function useAdminContext() {
  return useContext(AdminContext);
}

export function AdminContextProvider({ children }) {
  const [allUsersAdmin, setAllUsersAdmin] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const headersConfig = { headers: { Authorization: "Bearer " + token } };

  const addUser = async (newUser) => {
    try {
      const api = "http://localhost:8080/admin/add";
      const res = await axios.post(api, newUser, headersConfig);
      return res.data;
    } catch (err) {
      return { error: err };
    }
  };

  const editUser = async (editedUser) => {
    try {
      const api = "http://localhost:8080/admin/edit";
      const res = await axios.put(api, editedUser, headersConfig);
      return res.data;
    } catch (err) {
      return { error: err };
    }
  };

  const deleteUser = async (id) => {
    try {
      const api = `http://localhost:8080/admin/delete/${id}`;
      const res = await axios.delete(api, headersConfig);
      return res.data;
    } catch (err) {
      return { error: err };
    }
  };

  const collectUsersAdmin = async (id) => {
    try {
      const api = "http://localhost:8080/admin/users";
      const userData = await axios.get(api, headersConfig);
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
