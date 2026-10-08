import { useEffect, useRef, useState } from "react";
import Modal from "../modal/Modal";
import FormField, { inputClass } from "../modal/FormField";
import Button from "../ui/Button";

export default function CategoryModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setName("");
    setDescription("");
    setError("");
    const timer = setTimeout(() => nameRef.current?.focus(), 0);
    return () => clearTimeout(timer);
  }, [open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Nama kategori wajib diisi.");
      return;
    }
    onSubmit({ name: name.trim(), description: description.trim() });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Kategori baru" subtitle="Kelompokkan task berdasarkan kategori.">
      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <FormField id="category-name" label="Nama kategori" error={error}>
          <input
            id="category-name"
            ref={nameRef}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError("");
            }}
            placeholder="Contoh: Perkuliahan"
            aria-invalid={Boolean(error)}
            className={`${inputClass} ${error ? "border-rose-400" : ""}`}
          />
        </FormField>

        <FormField id="category-description" label="Deskripsi" hint="(opsional)">
          <input
            id="category-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Contoh: Task semester ganjil 2026/2027"
            className={inputClass}
          />
        </FormField>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit">Simpan kategori</Button>
        </div>
      </form>
    </Modal>
  );
}
