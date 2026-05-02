import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

const AddCardModal = ({ visible, onClose, handleCardAdd }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (!visible) {
      setTitle("");
      setDetail("");
    }
  }, [visible]);

  const canSave = title.trim() !== "" || detail.trim() !== "";

  return (
    <Dialog open={visible} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add a new card</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "grid", gap: 2, mt: 1 }}>
          <TextField
            label="Card title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
          />
          <TextField
            label="Detail"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            fullWidth
            multiline
            minRows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!canSave}
          onClick={() => {
            handleCardAdd(title.trim(), detail.trim());
            setTitle("");
            setDetail("");
          }}
        >
          Add card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCardModal;
