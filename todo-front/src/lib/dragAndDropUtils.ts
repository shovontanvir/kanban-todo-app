// drag-over-handler
const onDragOver = (
  e: React.DragEvent<HTMLDivElement>,
  handleDragOver: () => void
) => {
  e.preventDefault();
  handleDragOver();
};

// drag-leave-handler
const onDragLeave = (
  e: React.DragEvent<HTMLDivElement>,
  handleDragLeave: () => void
) => {
  e.preventDefault();
  handleDragLeave();
};

// drop-handler
const onDrop = (e: React.DragEvent<HTMLDivElement>, handleDrop: () => void) => {
  e.preventDefault();
  handleDrop();
};

// drag-start-handler
const handleDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  taskId: string
) => {
  e.dataTransfer.setData("text/plain", taskId);
  e.dataTransfer.effectAllowed = "move";
};

export { onDragOver, onDragLeave, onDrop, handleDragStart };
