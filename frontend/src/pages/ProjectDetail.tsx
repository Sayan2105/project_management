import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Task } from '../types'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')

  const fetchTasks = async () => {
    const res = await api.get(`/projects/${id}/tasks/`)
    setTasks(res.data.results)
  }

  useEffect(() => { fetchTasks() }, [])

  const createTask = async () => {
    try {
      await api.post(`/projects/${id}/tasks/`, { title, description: '', status: 'todo', due_date: null, project: Number(id) })
      setTitle('')
      fetchTasks()
    } catch (err: any) {
      console.log(err.response?.data)
    }
  }

  const deleteTask = async (taskId: number) => {
    await api.delete(`/projects/${id}/tasks/${taskId}/`)
    fetchTasks()
  }

  const updateStatus = async (taskId: number, newStatus: string) => {
    try {
      await api.patch(`/projects/${id}/tasks/${taskId}/`, { status: newStatus })
      fetchTasks()
    } catch (err) {
      console.error(err)
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'todo': return { backgroundColor: '#1e2433', color: '#94a3b8', border: '1px solid #334155' }
      case 'in-progress': return { backgroundColor: '#1c1400', color: '#fbbf24', border: '1px solid #92400e' }
      case 'done': return { backgroundColor: '#052e16', color: '#4ade80', border: '1px solid #166534' }
      default: return { backgroundColor: '#1e2433', color: '#94a3b8', border: '1px solid #334155' }
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f1117', color: '#e2e8f0', fontFamily: "'DM Sans', sans-serif", padding: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #1e2433', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.5px', margin: 0 }}>
            Tasks
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>{tasks.length} task{tasks.length !== 1 ? 's' : ''} in this project</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: 'transparent', border: '1px solid #1e2433', color: '#64748b', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          ← Back
        </button>
      </div>

      {/* Add Task */}
      <div style={{ backgroundColor: '#161b27', border: '1px solid #1e2433', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>New Task</h2>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Task title"
            style={{ flex: 1, backgroundColor: '#0f1117', border: '1px solid #1e2433', borderRadius: '8px', padding: '0.6rem 0.9rem', color: '#e2e8f0', fontSize: '0.95rem', outline: 'none' }}
          />
          <button
            onClick={createTask}
            style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Task Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {tasks.map(t => (
          <div
            key={t.id}
            style={{ backgroundColor: '#161b27', border: '1px solid #1e2433', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            {/* Left */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#f1f5f9' }}>{t.title}</h3>
              <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 500, ...getStatusStyle(t.status) }}>
                {t.status}
              </span>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <select
                value={t.status}
                onChange={(e) => updateStatus(t.id, e.target.value)}
                style={{ backgroundColor: '#0f1117', border: '1px solid #1e2433', color: '#94a3b8', padding: '0.35rem 0.6rem', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <button
                onClick={() => deleteTask(t.id)}
                style={{ backgroundColor: 'transparent', border: '1px solid #7f1d1d', color: '#f87171', borderRadius: '8px', padding: '0.35rem 0.9rem', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div style={{ textAlign: 'center', color: '#334155', padding: '3rem', border: '1px dashed #1e2433', borderRadius: '12px' }}>
            No tasks yet. Add one above ↑
          </div>
        )}
      </div>
    </div>
  )
}