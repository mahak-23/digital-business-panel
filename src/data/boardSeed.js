
const COLUMN_DEFS = [
  { key: "backlog", title: "Backlog" },
  { key: "todo", title: "TODO", color: "#FF6B6B" },
  { key: "inprogress", title: "In Progress", color: "#FFD93D" },
  { key: "done", title: "Completed", color: "#6BCB77" },
];

function cardId(seed, index) {
  return `card-${seed}-${index}`;
}

export const INITIAL_BOARD_COLUMNS = [
  {
    id: "col-backlog",
    title: "Backlog",
    cards: [
      {
        id: cardId("init", 1),
        title: "Database Setup",
        description: "Firebase Integration",
      },
      {
        id: cardId("init", 2),
        title: "Data Flow",
        description: "Setup Diagram with other developers",
      },
    ],
  },
  {
    id: "col-todo",
    title: "TODO",
    color: "#FF6B6B",
    cards: [
      {
        id: cardId("init", 9),
        title: "Data Table Page",
        description: "Server side Pagination",
      },
    ],
  },
  {
    id: "col-inprogress",
    title: "In Progress",
    color: "#4C9AFF",
    cards: [
      {
        id: cardId("init", 10),
        title: "Full Calendar Extension",
        description: "Make new events and store in global states",
      },
      {
        id: cardId("init", 11),
        title: "Custom Kanban Board",
        description: "Drag and drop card state store",
      },
    ],
  },
  {
    id: "col-done",
    title: "Completed",
    color: "#6BCB77",
    cards: [
      {
        id: cardId("init", 12),
        title: "Vite Server Setup",
        description: "Configure required modules and starters",
      },
      {
        id: cardId("init", 13),
        title: "Modular structure",
        description: "CSS modules to reduce naming conflicts",
      },
    ],
  },
];

/**
 * @param {number} totalCards minimum ~100 for virtualization showcase
 */
export function buildLargeDemoBoard(totalCards = 120) {
  const columns = COLUMN_DEFS.map((def, colIdx) => {
    const perColumn = Math.ceil(totalCards / COLUMN_DEFS.length);
    const cards = [];
    const base = colIdx * perColumn;
    for (let i = 0; i < perColumn && base + i < totalCards; i++) {
      const n = base + i + 1;
      cards.push({
        id: `card-demo-${n}`,
        title: `Task ${n}`,
        description: `Synthetic backlog item for perf demo (${def.title})`,
      });
    }
    return {
      id: `col-${def.key}`,
      title: def.title,
      cards,
    };
  });
  return { columns };
}

export const DEFAULT_BOARD_STATE = { columns: INITIAL_BOARD_COLUMNS };
