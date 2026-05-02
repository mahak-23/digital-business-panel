import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  addCard,
  moveCard,
  removeCard,
  reorderColumns,
} from "../../features/board/boardSlice";
import {
  persistMoveCard,
  persistAddCard,
  persistRemoveCard,
  persistReorderColumns,
} from "../../features/board/boardThunks";
import KanbanColumn from "./KanbanColumn";
import AddCardModal from "../AddCardModal/AddCardModal";
import "./KanbanBoard.css";

function cloneColumns(columns) {
  return columns.map((col) => ({
    ...col,
    cards: col.cards.map((c) => ({ ...c })),
  }));
}

function parseActive(activeId) {
  const s = String(activeId);
  if (s.startsWith("card:")) return { kind: "card", id: s.slice(5) };
  if (s.startsWith("column:")) return { kind: "column", id: s.slice(7) };
  return { kind: "unknown", id: s };
}

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const columns = useSelector((s) => s.board.columns);
  const pendingSync = useSelector((s) => s.board.pendingRemoteSyncs);

  const [modalOpen, setModalOpen] = useState(false);
  const [addTargetColumnId, setAddTargetColumnId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const columnIds = useMemo(
    () => columns.map((c) => `column:${c.id}`),
    [columns]
  );

  const activeParsed = activeId ? parseActive(activeId) : null;
  const draggingCardActive =
    activeParsed?.kind === "card" ? activeId : null;

  const activeCard = useMemo(() => {
    if (activeParsed?.kind !== "card") return null;
    for (const col of columns) {
      const c = col.cards.find((x) => x.id === activeParsed.id);
      if (c) return { card: c, columnTitle: col.title };
    }
    return null;
  }, [columns, activeParsed]);

  function resolveTargetIndex(toCol, overStr, cardId) {
    if (overStr.startsWith("drop:")) return 0;
    if (overStr.startsWith("card:")) {
      const overCardId = overStr.slice(5);
      if (overCardId === cardId) return null;
      const idx = toCol.cards.findIndex((c) => c.id === overCardId);
      return idx < 0 ? toCol.cards.length : idx;
    }
    if (overStr.startsWith("column:")) return toCol.cards.length;
    return toCol.cards.length;
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeStr = String(active.id);
    const overStr = String(over.id);
    const a = parseActive(active.id);

    if (a.kind === "column") {
      if (!overStr.startsWith("column:")) return;
      const oldIndex = columns.findIndex((c) => `column:${c.id}` === activeStr);
      const newIndex = columns.findIndex((c) => `column:${c.id}` === overStr);
      if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;
      const snap = cloneColumns(columns);
      dispatch(reorderColumns({ oldIndex, newIndex }));
      dispatch(persistReorderColumns({ columnsBefore: snap }));
      return;
    }

    if (a.kind !== "card") return;
    const cardId = a.id;
    const fromCol = columns.find((col) =>
      col.cards.some((c) => c.id === cardId)
    );
    if (!fromCol) return;

    let toColumnId = null;
    if (overStr.startsWith("card:")) {
      const overCardId = overStr.slice(5);
      const col = columns.find((co) =>
        co.cards.some((c) => c.id === overCardId)
      );
      toColumnId = col?.id ?? null;
    } else if (overStr.startsWith("drop:")) {
      toColumnId = overStr.slice(5);
    } else if (overStr.startsWith("column:")) {
      toColumnId = overStr.slice(7);
    }

    if (!toColumnId) return;
    const toCol = columns.find((c) => c.id === toColumnId);
    if (!toCol) return;

    const targetRaw = resolveTargetIndex(toCol, overStr, cardId);
    if (targetRaw === null) return;

    const fromIdx = fromCol.cards.findIndex((c) => c.id === cardId);
    let toIndex = targetRaw;
    if (fromCol.id === toColumnId && fromIdx < targetRaw) {
      toIndex = targetRaw - 1;
    }

    const snap = cloneColumns(columns);
    dispatch(
      moveCard({
        cardId,
        fromColumnId: fromCol.id,
        toColumnId,
        toIndex,
      })
    );
    dispatch(persistMoveCard({ columnsBefore: snap }));
  };

  const handleAddCard = (columnId, title, detail) => {
    const card = {
      id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title,
      description: detail,
    };
    const snap = cloneColumns(columns);
    dispatch(addCard({ columnId, card }));
    dispatch(persistAddCard({ columnsBefore: snap }));
    setModalOpen(false);
    setAddTargetColumnId(null);
  };

  const handleRemoveCard = (columnId, cardId) => {
    const snap = cloneColumns(columns);
    dispatch(removeCard({ columnId, cardId }));
    dispatch(persistRemoveCard({ columnsBefore: snap }));
  };

  const totalCards = columns.reduce((n, c) => n + c.cards.length, 0);

  return (
    <div className="kanban-root">
      <header className="kanban-hero">
        <div>
          <h1 className="kanban-hero__title">Collaborative Kanban</h1>
        </div>
        <div className="kanban-hero__badges">
          <span className="kanban-badge">{totalCards} cards</span>
          <span className="kanban-badge kanban-badge--accent">
            {pendingSync > 0 ? `${pendingSync} sync…` : "synced ✓"}
          </span>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragCancel={() => setActiveId(null)}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columnIds}
          strategy={horizontalListSortingStrategy}
        >
          <div className="kanban-columns">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                draggingCardActive={draggingCardActive}
                onAddCard={(colId) => {
                  setAddTargetColumnId(colId);
                  setModalOpen(true);
                }}
                onRemoveCard={handleRemoveCard}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {activeCard ? (
            <div className="kanban-card kanban-card--overlay">
              <div className="kanban-card__row">
                <span className="kanban-card__title">{activeCard.card.title}</span>
              </div>
              <span className="kanban-card__desc">{activeCard.card.description}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AddCardModal
        visible={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setAddTargetColumnId(null);
        }}
        handleCardAdd={(title, detail) =>
          addTargetColumnId && handleAddCard(addTargetColumnId, title, detail)
        }
      />
    </div>
  );
}
