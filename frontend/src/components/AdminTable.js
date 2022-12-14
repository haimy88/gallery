import React from "react";
import { useEffect, useState } from "react";
import { UseTable } from "../utils/UseTable";
import {
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useAdminContext } from "../contexts/AdminContext";
import Popup from "./Popup";
import AddUser from "../components/AddUser";

const headCells = [
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
  { id: "email", label: "Email Address" },
  { id: "description", label: "Description" },
  { id: "actions", label: "", disableSorting: true },
];

export default function AdminTable() {
  const [openPopup, setOpenPopup] = useState(false);
  const [existingUser, setExistingUser] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { deleteUser, allUsersAdmin, setAllUsersAdmin, collectUsersAdmin } =
    useAdminContext();

  useEffect(() => collectUsersAdmin, []);

  const { TblContainer, TblHead, TblPagination, petsAfterPagingAndSorting } =
    UseTable(allUsersAdmin, headCells, filterFn);
  useEffect(() => setAllUsersAdmin(allUsersAdmin));

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.firstName.toLowerCase().includes(target.value) ||
              x.lastName.toLowerCase().includes(target.value) ||
              x.description.toLowerCase().includes(target.value) ||
              x.email.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleDeleteUser = async (user) => {
    console.log(user);
    await deleteUser(user._id);
    collectUsersAdmin();
  };

  const openInPopup = (item) => {
    setExistingUser(item);
    setOpenPopup(true);
  };

  useEffect(() => {
    if (!openPopup) {
      setExistingUser(false);
      collectUsersAdmin();
    }
  }, [openPopup]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            margin: 5,
            padding: 4,
            width: "70%",
            backgroundColor: "#fff",
          }}
        >
          <Toolbar>
            <TextField
              variant="outlined"
              label="Search Users"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
              sx={{ marginBottom: 2, marginLeft: -3 }}
            />
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{ position: "absolute", right: "10px" }}
              onClick={() => setOpenPopup(true)}
            >
              Add New User
            </Button>
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {petsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      sx={{ borderRadius: 2, maxWidth: 5 }}
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlinedIcon fontSize="sm" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteUser(item)}
                      color="warning"
                    >
                      <CloseIcon fontSize="sm" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
      </Box>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        {" "}
        <AddUser existingUser={existingUser} setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
}
