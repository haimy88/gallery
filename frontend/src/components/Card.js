import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({ user }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          User
        </Typography>
        <Typography variant="h5" component="div">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2">{user.description}</Typography>
      </CardContent>
    </Card>
  );
}
