import React from "react";
import { Dialog, DialogContent, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const { children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup}>
      <DialogContent dividers maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button
            color="warning"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Button>
        </Box>
        <Box sx={{ mt: -4 }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}
