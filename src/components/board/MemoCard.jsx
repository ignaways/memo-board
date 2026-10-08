import IconButton from "../ui/IconButton";
import TagChip from "../ui/TagChip";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "../ui/Icons";
import { COLUMNS, STATUS, getColumnIndex } from "../../constants/columns";
import { formatDate } from "../../utils/formatDate";

export default function MemoCard({ memo, column, isDragging, onDragStart, onDragEnd, onMove, onDelete }) {
  const index = getColumnIndex(memo.status);
  const prev = COLUMNS[index - 1];
  const next = COLUMNS[index + 1];
  const isComplete = memo.status === STATUS.COMPLETE;

  return (
    <article
      draggable
      onDragStart={(event) => onDragStart(event, memo.id)}
      onDragEnd={onDragEnd}
      className={`group cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition active:cursor-grabbing ${
        isDragging ? "opacity-40" : "hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`text-sm font-semibold leading-snug text-slate-900 ${
            isComplete ? "line-through decoration-slate-400" : ""
          }`}
        >
          {memo.title}
        </h3>
        <IconButton
          tone="danger"
          onClick={() => onDelete(memo.id)}
          aria-label={`Hapus memo ${memo.title}`}
          className="shrink-0 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
        >
          <TrashIcon />
        </IconButton>
      </div>

      {memo.description && (
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">{memo.description}</p>
      )}

      {memo.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {memo.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${column.badge}`}>
          {formatDate(memo.createdAt)}
        </span>
        <div className="flex gap-1">
          <IconButton
            disabled={!prev}
            onClick={() => prev && onMove(memo.id, prev.id)}
            aria-label={prev ? `Pindah ke ${prev.title}` : "Sudah di kolom pertama"}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            disabled={!next}
            onClick={() => next && onMove(memo.id, next.id)}
            aria-label={next ? `Pindah ke ${next.title}` : "Sudah di kolom terakhir"}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    </article>
  );
}
