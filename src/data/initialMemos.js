import { STATUS } from "../constants/columns";

const now = new Date().toISOString();

export const initialMemos = [
  {
    id: 1,
    title: "Rapat sprint planning",
    description: "Siapkan daftar backlog dan estimasi story point untuk sprint berikutnya.",
    status: STATUS.NEW,
    tags: ["meeting", "planning"],
    createdAt: now,
  },
  {
    id: 2,
    title: "Refactor modul autentikasi",
    description: "Pisahkan logic token ke service tersendiri dan tambahkan refresh token.",
    status: STATUS.PROGRESS,
    tags: ["backend", "security"],
    createdAt: now,
  },
  {
    id: 3,
    title: "Deploy landing page",
    description: "Landing page sudah live di production.",
    status: STATUS.COMPLETE,
    tags: ["frontend", "deploy"],
    createdAt: now,
  },
  {
    id: 4,
    title: "Desain ulang halaman dashboard",
    description: "Buat wireframe baru dan sesuaikan komponen chart.",
    status: STATUS.NEW,
    tags: ["frontend", "planning"],
    createdAt: now,
  },
];
