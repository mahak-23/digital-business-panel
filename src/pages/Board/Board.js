import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";
import "./Board.css";

/**
 * Route shell for the enterprise kanban demo:
 * Redux Toolkit slices, optimistic async thunks, @dnd-kit.
 */
export default function BoardPage() {
  return (
    <div className="board-page">
      <KanbanBoard />
    </div>
  );
}
