import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

interface Task {
  id: number
  title: string
  description: string
  status: string
  due_date: string
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filterStatus, setFilterStatus] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('todo')

  const fetchTasks = async () => {
    const filter = filterStatus ? `?status=${filterStatus}` : ''
    const res = await api.get(`/projects/${id}/tasks/${filter}`)
    setTasks(res.data.results || res.data)
  }

  useEffect(() => { fetchTasks() }, [filterStatus])

  const createTask = async () => {
    if (!title) return alert('Title is required')
    await api.post(`/projects/${id}/tasks/`, {
      title, description, status, due_date: dueDate || null, project: id
    })
    setTitle('')
    setDescription('')
    setDueDate('')
    setStatus('todo')
    fetchTasks()
  }

  const deleteTask = async (taskId: number) => {
    await api.delete(`/projects/${id}/tasks/${taskId}/`)
    fetchTasks()
  }

  const updateStatus = async (taskId: number, newStatus: string) => {
    await api.patch(`/projects/${id}/tasks/${taskId}/`, { status: newStatus })
    fetchTasks()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Project Tasks</h1>
          <button onClick={() => navigate('/dashboard')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Back
          </button>
        </div>

        {/* Create Task */}
        <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
          <h2 className="font-semibold text-lg">New Task</h2>
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Title" className="w-full border p-2 rounded" />
          <input value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Description" className="w-full border p-2 rounded" />
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
            className="w-full border p-2 rounded" />
          <select value={status} onChange={e => setStatus(e.target.value)}
            className="w-full border p-2 rounded">
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={createTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Task
          </button>
        </div>

        {/* Filter */}
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="w-full border p-2 rounded mb-4 bg-white">
          <option value="">All Tasks</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Task List */}
        {tasks.map(t => (
          <div key={t.id} className="bg-white p-4 rounded shadow mb-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-gray-500 text-sm">{t.description}</p>
                {t.due_date && <p className="text-xs text-gray-400">Due: {t.due_date}</p>}
              </div>
              <div className="flex gap-2 items-center">
                <select value={t.status} onChange={e => updateStatus(t.id, e.target.value)}
                  className="border p-1 rounded text-sm">
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <button onClick={() => deleteTask(t.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}