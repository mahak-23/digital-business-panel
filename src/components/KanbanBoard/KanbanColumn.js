import { useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IoMdAdd } from "react-icons/io";
import KanbanCard from "./KanbanCard";

export default function KanbanColumn({
  column,
  onAddCard,
  onRemoveCard,
  draggingCardActive,
}) {
  const parentRef = useRef(null);

  const colSort = useSortable({
    id: `column:${column.id}`,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop:${column.id}`,
  });

  const colStyle = {
    transform: CSS.Transform.toString(colSort.transform),
    transition: colSort.transition,
    opacity: colSort.isDragging ? 0.88 : 1,
  };

  const renderCard = (card) => (
    <KanbanCard
      key={card.id}
      card={card}
      columnTitle={column.title}
      onRemove={(cardId) => onRemoveCard(column.id, cardId)}
    />
  );

  return (
    <div
      ref={colSort.setNodeRef}
      style={colStyle}
      className="kanban-column"
      {...colSort.attributes}
    >
      <div className="kanban-column__header" {...colSort.listeners} style={{ backgroundColor: column.color || '#333' }}>
        <span className="kanban-column__title">{column.title}</span>
        <span className="kanban-column__count">{column.cards.length}</span>
        <button
          type="button"
          className="kanban-column__add"
          aria-label="Add card"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onAddCard(column.id);
          }}
        >
          <IoMdAdd color="white" size={22} />
        </button>
      </div>

      <div
        ref={(el) => {
          parentRef.current = el;
          setDropRef(el);
        }}
        className={`kanban-column__scroll ${isOver ? "kanban-column__scroll--over" : ""}`}
      >
        {!column.cards.length && (
          <div className="kanban-column__empty">Drop cards here</div>
        )}
        {column.cards.map((card) => renderCard(card))}
      </div>
    </div>
  );
}
