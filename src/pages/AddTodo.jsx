import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import { addTodo } from '../services/todoService';

const AddTodo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'Medium',
    status: 'Pending'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await addTodo(formData);
      navigate('/todos');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/todos" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600">
          ← Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Create a Task</h1>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <TodoForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            buttonText={loading ? 'Creating...' : 'Create Task'}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTodo;