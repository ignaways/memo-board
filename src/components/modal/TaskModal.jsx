import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import FormField, { inputClass } from "./FormField";
import PrioritySelect from "./PrioritySelect";
import TagInput from "./TagInput";
import ChecklistInput from "./ChecklistInput";
import Button from "../ui/Button";
import { PRIORITY } from "../../constants/priorities";

const EMPTY_FORM = {
  title: "",
  description: "",
  priority: PRIORITY.MEDIUM,
  deadline: "",
  tags: [],
  checklist: [],
};

const toForm = (task) =>
  task
    ? {
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
        tags: [...task.tags],
        checklist: task.checklist.map((item) => ({ ...item })),
      }
    : EMPTY_FORM;

export default function TaskModal({ open, task, onClose, onSubmit, tagSuggestions }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const titleRef = useRef(null);
  const isEdit = Boolean(task);

  useEffect(() => {
    if (!open) return undefined;
    setForm(toForm(task));
    setError("");
    const timer = setTimeout(() => titleRef.current?.focus(), 0);
    return () => clearTimeout(timer);
  }, [open, task]);

  const setField = (field) => (value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setError("Title wajib diisi.");
      titleRef.current?.focus();
      return;
    }
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      checklist: form.checklist
        .map((item) => ({ ...item, text: item.text.trim() }))
        .filter((item) => item.text),
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={isEdit ? "Edit task" : "Task baru"}
      subtitle={isEdit ? "Perbarui detail task." : "Task baru akan masuk ke kolom New."}
    >
      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <FormField id="task-title" label="Title" error={error}>
          <input
            id="task-title"
            ref={titleRef}
            value={form.title}
            onChange={(event) => {
              setField("title")(event.target.value);
              if (error) setError("");
            }}
            placeholder="Contoh: Review pull request"
            aria-invalid={Boolean(error)}
            className={`${inputClass} ${error ? "border-rose-400" : ""}`}
          />
        </FormField>

        <FormField id="task-description" label="Description" hint="(opsional)">
          <textarea
            id="task-description"
            rows={3}
            value={form.description}
            onChange={(event) => setField("description")(event.target.value)}
            placeholder="Detail task"
            className={`${inputClass} resize-none`}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="task-priority" label="Priority">
            <PrioritySelect id="task-priority" value={form.priority} onChange={setField("priority")} />
          </FormField>

          <FormField id="task-deadline" label="Deadline" hint="(opsional)">
            <input
              id="task-deadline"
              type="date"
              value={form.deadline}
              onChange={(event) => setField("deadline")(event.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField id="task-tags" label="Tags" hint="(opsional)">
          <TagInput id="task-tags" tags={form.tags} onChange={setField("tags")} suggestions={tagSuggestions} />
        </FormField>

        <FormField id="task-checklist" label="Checklist to do" hint="(opsional)">
          <ChecklistInput id="task-checklist" items={form.checklist} onChange={setField("checklist")} />
        </FormField>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit">{isEdit ? "Simpan perubahan" : "Simpan task"}</Button>
        </div>
      </form>
    </Modal>
  );
}
