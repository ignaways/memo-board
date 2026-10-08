import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import TagInput from "./TagInput";
import Button from "../ui/Button";

const inputClass =
  "mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-indigo-500";

export default function MemoModal({ open, onClose, onSave, tagSuggestions }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setTitle("");
    setDescription("");
    setTags([]);
    setError("");
    const timer = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(timer);
  }, [open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      setError("Title wajib diisi.");
      return;
    }
    onSave({ title: title.trim(), description: description.trim(), tags });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="memo-modal-title">
      <h2 id="memo-modal-title" className="text-lg font-semibold text-slate-900">
        Memo baru
      </h2>
      <p className="mt-1 text-sm text-slate-500">Memo baru akan masuk ke kolom New.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="memo-title" className="block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="memo-title"
              ref={inputRef}
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (error) setError("");
              }}
              placeholder="Contoh: Review pull request"
              aria-invalid={Boolean(error)}
              className={`${inputClass} ${error ? "border-rose-400" : "border-slate-300"}`}
            />
            {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
          </div>

          <div>
            <label htmlFor="memo-description" className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id="memo-description"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Detail memo (opsional)"
              className={`${inputClass} resize-none border-slate-300`}
            />
          </div>

          <div>
            <label htmlFor="memo-tags" className="block text-sm font-medium text-slate-700">
              Tags
            </label>
            <TagInput id="memo-tags" tags={tags} onChange={setTags} suggestions={tagSuggestions} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit">Simpan memo</Button>
        </div>
      </form>
    </Modal>
  );
}
