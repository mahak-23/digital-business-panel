import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { addUser, removeUser, updateUser } from "../../features/users/usersSlice";
import "./DataGrid.css";

const defaultForm = {
  firstName: "",
  lastName: "",
  city: "",
};

const DataGrid = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [formState, setFormState] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setFormState(defaultForm);
    setEditingId(null);
  };

  const handleSave = () => {
    const payload = {
      id: editingId || `user-${Date.now()}`,
      name: {
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
      city: formState.city,
    };

    if (editingId) {
      dispatch(updateUser(payload));
    } else {
      dispatch(addUser(payload));
    }
    resetForm();
  };

  return (
    <div className="table-container" style={{ padding: "0" }}>
      <Paper sx={{ p: 2, mb: 3, bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <Stack spacing={2} direction={{ xs: "column", md: "row" }} alignItems="flex-end">
          <TextField
            label="First name"
            size="small"
            variant="outlined"
            value={formState.firstName}
            onChange={(event) => setFormState({ ...formState, firstName: event.target.value })}
            fullWidth
            sx={{ background: "rgba(255,255,255,0.04)", borderRadius: "14px", minHeight: "40px" }}
          />
          <TextField
            label="Last name"
            size="small"
            variant="outlined"
            value={formState.lastName}
            onChange={(event) => setFormState({ ...formState, lastName: event.target.value })}
            fullWidth
            sx={{ background: "rgba(255,255,255,0.04)", borderRadius: "14px", minHeight: "40px" }}
          />
          <TextField
            label="City"
            size="small"
            variant="outlined"
            value={formState.city}
            onChange={(event) => setFormState({ ...formState, city: event.target.value })}
            fullWidth
            sx={{ background: "rgba(255,255,255,0.04)", borderRadius: "14px", minHeight: "40px" }}
          />
          <Button
            size="small"
            variant="contained"
            onClick={handleSave}
            disabled={!formState.firstName || !formState.lastName}
            sx={{ minWidth: 130, height: 40 }}
          >
            {editingId ? "Save" : "Add user"}
          </Button>
          {editingId && (
            <Button size="small" variant="outlined" onClick={resetForm} sx={{ minWidth: 130, height: 40 }}>
              Cancel
            </Button>
          )}
        </Stack>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name.firstName}</TableCell>
                <TableCell>{user.name.lastName}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      setEditingId(user.id);
                      setFormState({
                        firstName: user.name.firstName,
                        lastName: user.name.lastName,
                        city: user.city,
                      });
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => dispatch(removeUser(user.id))}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataGrid;
