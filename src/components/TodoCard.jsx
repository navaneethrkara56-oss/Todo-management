import React from 'react';
import { Link } from 'react-router-dom';

const TodoCard = ({ todo, onDelete }) => {
  const priorityStyle = {
    High: 'bg-red-50 text-red-600 border-red-100',
    Medium: 'bg-amber-50 text-amber-600 border-amber-100',
    Low: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };

  const formatDate = date => new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="border-b border-slate-100 px-5 py-5 transition last:border-0 hover:bg-slate-50/60 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${todo.status === 'Completed' ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white'}`}>
            {todo.status === 'Completed' && '✓'}
          </div>
          <div className="min-w-0">
            <h3 className={`font-medium ${todo.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
              {todo.title}
            </h3>
            <p className="mt-1 max-w-xl truncate text-xs text-slate-400">{todo.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] text-slate-500">
                📅 {formatDate(todo.date)}
              </span>
              <span className={`rounded-md border px-2.5 py-1 text-[10px] font-semibold ${priorityStyle[todo.priority]}`}>
                {todo.priority} Priority
              </span>
              <span className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${todo.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                {todo.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 pl-10 sm:pl-0">
          <Link
            to={`/edit-todo/${todo.id}`}
            className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(todo.id)}
            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;