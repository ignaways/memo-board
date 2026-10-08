import { Link } from "react-router-dom";
import { CURRENT_USER } from "../../constants/user";

export default function Header() {
  const initial = CURRENT_USER.name.charAt(0).toUpperCase();

  return (
    <header className="bg-primary-800 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold text-primary-800"
          >
            {initial}
          </span>
          <p className="text-sm font-medium">Hi, {CURRENT_USER.name}</p>
        </div>

        <Link
          to="/"
          className="rounded text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <p className="text-xl font-bold tracking-tight sm:text-2xl">Memo Board</p>
          <p className="text-xs text-primary-200">Memo board task management</p>
        </Link>
      </div>
    </header>
  );
}
