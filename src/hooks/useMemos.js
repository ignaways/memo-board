import { useMemo, useState } from "react";
import { initialMemos } from "../data/initialMemos";
import { STATUS } from "../constants/columns";

export default function useMemos() {
  const [memos, setMemos] = useState(initialMemos);

  const addMemo = ({ title, description, tags }) => {
    const memo = {
      id: Date.now(),
      title,
      description,
      tags,
      status: STATUS.NEW,
      createdAt: new Date().toISOString(),
    };
    setMemos((prev) => [...prev, memo]);
  };

  const deleteMemo = (id) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  const moveMemo = (id, status) => {
    setMemos((prev) => prev.map((memo) => (memo.id === id ? { ...memo, status } : memo)));
  };

  const allTags = useMemo(
    () => [...new Set(memos.flatMap((memo) => memo.tags))].sort((a, b) => a.localeCompare(b)),
    [memos]
  );

  const stats = useMemo(() => {
    const total = memos.length;
    const done = memos.filter((memo) => memo.status === STATUS.COMPLETE).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    return { total, done, percent };
  }, [memos]);

  return { memos, allTags, addMemo, deleteMemo, moveMemo, stats };
}
