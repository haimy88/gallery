import React from "react";
import { useEffect, useState } from "react";
import { UseTable } from "./UseTable";
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
import { useAuthContext } from "../contexts/AuthContext";
import Popup from "./Popup";
import AddUser from "../components/AddUser";
// import PetForm from "./PetForm";

const headCells = [
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
  { id: "email", label: "Email Address" },
  { id: "description", label: "Description" },
  { id: "actions", label: "", disableSorting: true },
];

export default function AdminTable() {
  const { allUsers, setAllUsers, collectUsers } = useAuthContext();
  const [openPopup, setOpenPopup] = useState(false);
  const [existingUser, setExistingUser] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => collectUsers, []);

  // const { deletePet } = usePetContext();

  const { TblContainer, TblHead, TblPagination, petsAfterPagingAndSorting } =
    UseTable(allUsers, headCells, filterFn);
  useEffect(() => setAllUsers(allUsers));

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.first_name.toLowerCase().includes(target.value) ||
              x.last_name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleDeleteUser = async (user) => {
    // await deletePet(pet);
    // window.location.reload(true);
  };

  const openInPopup = (item) => {
    setExistingUser(item);
    setOpenPopup(true);
  };

  useEffect(() => {
    console.log(existingUser);
  }, [existingUser]);

  useEffect(() => {
    if (!openPopup) setExistingUser(false);
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
              {petsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
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
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={existingUser ? "Edit User" : "Add New User"}
      >
        {" "}
        <AddUser existingUser={existingUser} setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
}
