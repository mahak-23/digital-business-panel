import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_BOARD_STATE } from "../../data/boardSeed";
import {
  persistMoveCard,
  persistAddCard,
  persistRemoveCard,
  persistReorderColumns,
} from "./boardThunks";

function findColumn(columns, columnId) {
  return columns.find((c) => c.id === columnId);
}

const slice = createSlice({
  name: "board",
  initialState: {
    columns: DEFAULT_BOARD_STATE.columns,
    pendingRemoteSyncs: 0,
    lastRollbackReason: null,
  },
  reducers: {
    moveCard(
      state,
      action
    ) {
      const { cardId, fromColumnId, toColumnId, toIndex } = action.payload;
      const fromCol = findColumn(state.columns, fromColumnId);
      const toCol = findColumn(state.columns, toColumnId);
      if (!fromCol || !toCol) return;
      const fromIdx = fromCol.cards.findIndex((c) => c.id === cardId);
      if (fromIdx === -1) return;
      const [card] = fromCol.cards.splice(fromIdx, 1);
      const insertAt = Math.min(Math.max(toIndex, 0), toCol.cards.length);
      toCol.cards.splice(insertAt, 0, card);
    },
    reorderColumns(state, action) {
      const { oldIndex, newIndex } = action.payload;
      const next = [...state.columns];
      const [removed] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, removed);
      state.columns = next;
    },
    addCard(state, action) {
      const { columnId, card } = action.payload;
      const col = findColumn(state.columns, columnId);
      if (!col) return;
      col.cards.push(card);
    },
    removeCard(state, action) {
      const { columnId, cardId } = action.payload;
      const col = findColumn(state.columns, columnId);
      if (!col) return;
      col.cards = col.cards.filter((c) => c.id !== cardId);
    },
    renameColumn(state, action) {
      const { columnId, title } = action.payload;
      const col = findColumn(state.columns, columnId);
      if (!col) return;
      col.title = title;
    },
    restoreColumnsSnapshot(state, action) {
      state.columns = action.payload.columns;
      state.lastRollbackReason = action.payload.reason ?? "sync_failed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(persistMoveCard.pending, (state) => {
        state.pendingRemoteSyncs += 1;
        state.lastRollbackReason = null;
      })
      .addCase(persistMoveCard.fulfilled, (state) => {
        state.pendingRemoteSyncs -= 1;
      })
      .addCase(persistMoveCard.rejected, (state, action) => {
        state.pendingRemoteSyncs -= 1;
        const snap = action.payload?.columnsBefore ?? action.meta.arg?.columnsBefore;
        if (snap) {
          state.columns = snap;
          state.lastRollbackReason = "move_rejected";
        }
      })
      .addCase(persistAddCard.pending, (state) => {
        state.pendingRemoteSyncs += 1;
      })
      .addCase(persistAddCard.fulfilled, (state) => {
        state.pendingRemoteSyncs -= 1;
      })
      .addCase(persistAddCard.rejected, (state, action) => {
        state.pendingRemoteSyncs -= 1;
        const snap = action.payload?.columnsBefore ?? action.meta.arg?.columnsBefore;
        if (snap) state.columns = snap;
      })
      .addCase(persistRemoveCard.pending, (state) => {
        state.pendingRemoteSyncs += 1;
      })
      .addCase(persistRemoveCard.fulfilled, (state) => {
        state.pendingRemoteSyncs -= 1;
      })
      .addCase(persistRemoveCard.rejected, (state, action) => {
        state.pendingRemoteSyncs -= 1;
        const snap = action.payload?.columnsBefore ?? action.meta.arg?.columnsBefore;
        if (snap) state.columns = snap;
      })
      .addCase(persistReorderColumns.pending, (state) => {
        state.pendingRemoteSyncs += 1;
      })
      .addCase(persistReorderColumns.fulfilled, (state) => {
        state.pendingRemoteSyncs -= 1;
      })
      .addCase(persistReorderColumns.rejected, (state, action) => {
        state.pendingRemoteSyncs -= 1;
        const snap = action.payload?.columnsBefore ?? action.meta.arg?.columnsBefore;
        if (snap) state.columns = snap;
      });
  },
});

export const {
  moveCard,
  reorderColumns,
  addCard,
  removeCard,
  renameColumn,
  restoreColumnsSnapshot,
} = slice.actions;

export default slice.reducer;
