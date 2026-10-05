import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TodoCard from '../components/TodoCard';
import { getTodos, deleteTodo } from '../services/todoService';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const pendingCount = todos.filter(todo => todo.status === 'Pending').length;
  const completedCount = todos.filter(todo => todo.status === 'Completed').length;
  const highPriorityCount = todos.filter(todo => todo.priority === 'High').length;

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(search.toLowerCase()) ||
    todo.description.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'Completed' ? 1 : -1;

    if (a.status === 'Pending' && b.status === 'Pending') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    }

    return new Date(a.date) - new Date(b.date);
  });

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">My Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">Stay organized and keep track of everything you need to do.</p>
          </div>

          <Link to="/add-todo" className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
            <span className="text-xl">+</span> Add New Task
          </Link>
        </div>

        {/* All Tasks */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">All Tasks</h2>
              <p className="mt-1 text-sm text-slate-500">Manage and organize your tasks.</p>
            </div>

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 sm:w-64"
            />
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-sm text-slate-400">
              Loading tasks...
            </div>
          ) : sortedTodos.length > 0 ? (
            sortedTodos.map(todo => (
              <TodoCard key={todo.id} todo={todo} onDelete={handleDelete} />
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-400">
                🔍
              </div>
              <p className="font-medium text-slate-700">No tasks found</p>
              <p className="mt-1 text-sm text-slate-400">
                Try searching with a different keyword.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TodoList;