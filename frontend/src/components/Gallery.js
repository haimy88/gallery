import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import Card from "../components/Card";
import { Grid, Box } from "@mui/material";

export default function Gallery() {
  const { allUsers, collectUsers } = useAuthContext();

  useEffect(() => {
    collectUsers();
  }, []);

  return (
    <>
      <Box sx={{ ml: 4, mr: 4, mt: 6 }}>
        <Grid container spacing={10}>
          {allUsers.length &&
            allUsers.map((user) => (
              <Grid item xs={4}>
                <Card user={user} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
