import axios from 'axios';

const API_URL = 'https://todo-management-api-bl40.onrender.com/todos';

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTodo = async id => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addTodo = todo => axios.post(API_URL, todo);
export const updateTodo = (id, todo) => axios.patch(`${API_URL}/${id}`, todo);
export const deleteTodo = id => axios.delete(`${API_URL}/${id}`);