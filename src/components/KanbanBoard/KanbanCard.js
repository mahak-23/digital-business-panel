import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxCross2 } from "react-icons/rx";

function cardGradient(columnTitle) {
  const t = columnTitle?.toLowerCase() ?? "";
  if (t.includes("todo"))
    return "linear-gradient(65.35deg, rgba(65,65,65,.67) -1.72%, rgba(220,48,48) 163.54%)";
  if (t.includes("in progress") || t.includes("inprogress"))
    return "linear-gradient(65.35deg, rgba(65,65,65,.67) -1.72%, rgba(48,189,220) 163.54%)";
  if (t.includes("completed") || t.includes("done"))
    return "linear-gradient(65.35deg, rgba(65,65,65,.67) -1.72%, rgba(48,220,86) 163.54%)";
  if (t.includes("backlog"))
    return "linear-gradient(65.35deg, rgba(65,65,65,.67) -1.72%, rgba(134,48,220) 163.54%)";
  return "linear-gradient(65.35deg, rgba(65,65,65,.85) -1.72%, rgba(90,90,90) 163.54%)";
}

export default function KanbanCard({
  card,
  columnTitle,
  onRemove,
  overlay,
}) {
  const id = `card:${card.id}`;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: overlay });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    background: cardGradient(columnTitle),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="kanban-card kanban-card--sortable"
      {...attributes}
      {...listeners}
    >
      <div className="kanban-card__row">
        <span className="kanban-card__title">{card.title}</span>
        <button
          type="button"
          className="remove-button"
          aria-label="Remove card"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(card.id);
          }}
        >
          <RxCross2 color="white" size={15} />
        </button>
      </div>
      <span className="kanban-card__desc">{card.description}</span>
    </div>
  );
}
