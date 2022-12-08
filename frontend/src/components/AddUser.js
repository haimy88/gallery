import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAdminContext } from "../contexts/AdminContext";
import PersonIcon from "@mui/icons-material/Person";

const theme = createTheme();

export default function AddUser({ existingUser }) {
  const { addUser, editUser } = useAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => console.log(isLoading), [isLoading]);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    setError();
    setSuccess();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
      repassword: data.get("repassword"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      description: data.get("description"),
      _id: existingUser._id,
    };
    Object.keys(user).forEach((key) => {
      if (user[key] === "") {
        delete user[key];
      }
    });
    if (existingUser) {
      const message = await editUser(user);
      message.error
        ? setError(message.error.response.data)
        : setSuccess(message);
    } else {
      const res = await addUser(user);
      res.error ? setError(res.error.response.data) : setSuccess(res);
    }
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {existingUser ? "Edit User" : "Add User"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  placeholder={existingUser.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder={existingUser.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  placeholder={existingUser.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={existingUser ? "New Password" : "Password"}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label={
                    existingUser ? "Retype New Password" : "Retype Password"
                  }
                  type="password"
                  id="repassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  type="description"
                  id="description"
                  autoComplete="description"
                  placeholder={existingUser.description}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {existingUser ? "Edit User" : "Add User"}
            </Button>
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
