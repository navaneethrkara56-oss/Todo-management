import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import { getTodo, updateTodo } from '../services/todoService';

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'Medium',
    status: 'Pending'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await getTodo(id);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching todo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateTodo(id, formData);
      navigate('/todos');
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-400">
        Loading task...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/todos" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600">
          ← Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Update Task</h1>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <TodoForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            buttonText={saving ? 'Saving...' : 'Save Changes'}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTodo;