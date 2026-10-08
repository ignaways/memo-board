import { useRef, useState } from "react";

export default function useDragAndDrop(onDropItem) {
  const [draggingId, setDraggingId] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const draggingRef = useRef(null);
  const targetRef = useRef(null);

  const updateTarget = (next) => {
    const current = targetRef.current;
    if (current && next && current.status === next.status && current.beforeId === next.beforeId) return;
    if (!current && !next) return;
    targetRef.current = next;
    setDropTarget(next);
  };

  const reset = () => {
    draggingRef.current = null;
    setDraggingId(null);
    updateTarget(null);
  };

  const handleDragStart = (event, id) => {
    draggingRef.current = id;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
    requestAnimationFrame(() => setDraggingId(id));
  };

  const handleDragOver = (event, status) => {
    if (!draggingRef.current) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    const cards = [...event.currentTarget.querySelectorAll("[data-task-id]")].filter(
      (element) => element.dataset.taskId !== draggingRef.current
    );

    const nextCard = cards.find((element) => {
      const rect = element.getBoundingClientRect();
      return event.clientY < rect.top + rect.height / 2;
    });

    updateTarget({ status, beforeId: nextCard ? nextCard.dataset.taskId : null });
  };

  const handleDragLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) updateTarget(null);
  };

  const handleDrop = (event, status) => {
    event.preventDefault();
    const id = draggingRef.current || event.dataTransfer.getData("text/plain");
    const beforeId = targetRef.current?.status === status ? targetRef.current.beforeId : null;
    if (id) onDropItem(id, status, beforeId);
    reset();
  };

  return {
    draggingId,
    dropTarget,
    handleDragStart,
    handleDragEnd: reset,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
