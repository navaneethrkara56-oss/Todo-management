import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const navStyle = path =>
    `rounded-xl px-5 py-3 text-sm font-semibold transition ${
      location.pathname === path
        ? 'bg-blue-50 text-blue-600'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-22 max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-8">

        <Link to="/todos" className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="TaskFlow"
            className="h-12 w-12 rounded-xl object-contain sm:h-14 sm:w-14"
          />

          <div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl">
              TaskFlow
            </h1>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-slate-400 sm:text-xs">
              Task Manager
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link to="/todos" className={navStyle('/todos')}>
            Dashboard
          </Link>

          <Link to="/add-todo" className={navStyle('/add-todo')}>
            Add Task
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default Header;