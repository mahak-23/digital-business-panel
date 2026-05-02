import { createAsyncThunk } from "@reduxjs/toolkit";

const simulateNetwork = (ms = 380) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/** Called after optimistic reducer mutates state; simulates API persistence; rollback optional on reject. */
export const persistMoveCard = createAsyncThunk(
  "board/persistMoveCard",
  async ({ columnsBefore }, { rejectWithValue }) => {
    try {
      await simulateNetwork();
      return true;
    } catch (e) {
      return rejectWithValue({ columnsBefore });
    }
  }
);

export const persistAddCard = createAsyncThunk(
  "board/persistAddCard",
  async ({ columnsBefore }, { rejectWithValue }) => {
    try {
      await simulateNetwork(280);
      return true;
    } catch (e) {
      return rejectWithValue({ columnsBefore });
    }
  }
);

export const persistRemoveCard = createAsyncThunk(
  "board/persistRemoveCard",
  async ({ columnsBefore }, { rejectWithValue }) => {
    try {
      await simulateNetwork(260);
      return true;
    } catch (e) {
      return rejectWithValue({ columnsBefore });
    }
  }
);

export const persistReorderColumns = createAsyncThunk(
  "board/persistReorderColumns",
  async ({ columnsBefore }, { rejectWithValue }) => {
    try {
      await simulateNetwork(300);
      return true;
    } catch (e) {
      return rejectWithValue({ columnsBefore });
    }
  }
);
