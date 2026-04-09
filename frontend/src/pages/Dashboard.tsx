import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Project, PaginatedResponse } from '../types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()
  const { logout } = useAuth()

  const fetchProjects = async () => {
    try {
      const res = await api.get<PaginatedResponse<Project>>('/projects/')
      setProjects(res.data.results)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const createProject = async () => {
    if (!title) return
    await api.post('/projects/', { title, description, status: 'active' })
    setTitle('')
    setDescription('')
    fetchProjects()
  }

  const deleteProject = async (id: number) => {
    await api.delete(`/projects/${id}/`)
    fetchProjects()
  }

  const updateProjectStatus = async (id: number, status: string) => {
    await api.patch(`/projects/${id}/`, { status })
    fetchProjects()
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f1117', color: '#e2e8f0', fontFamily: "'DM Sans', sans-serif", padding: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #1e2433', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.5px', margin: 0 }}>
            My Projects
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
        </div>
        <button
          onClick={logout}
          style={{ backgroundColor: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s' }}
          onMouseOver={e => { (e.target as HTMLButtonElement).style.backgroundColor = '#ef4444'; (e.target as HTMLButtonElement).style.color = '#fff' }}
          onMouseOut={e => { (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.target as HTMLButtonElement).style.color = '#ef4444' }}
        >
          Logout
        </button>
      </div>

      {/* Create Form */}
      <div style={{ backgroundColor: '#161b27', border: '1px solid #1e2433', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>New Project</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            style={{ backgroundColor: '#0f1117', border: '1px solid #1e2433', borderRadius: '8px', padding: '0.6rem 0.9rem', color: '#e2e8f0', fontSize: '0.95rem', outline: 'none' }}
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description (optional)"
            style={{ backgroundColor: '#0f1117', border: '1px solid #1e2433', borderRadius: '8px', padding: '0.6rem 0.9rem', color: '#e2e8f0', fontSize: '0.95rem', outline: 'none' }}
          />
          <button
            onClick={createProject}
            style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', alignSelf: 'flex-start' }}
          >
            + Create Project
          </button>
        </div>
      </div>

      {/* Project Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {projects.map((p) => (
          <div
            key={p.id}
            style={{ backgroundColor: '#161b27', border: '1px solid #1e2433', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.2s' }}
          >
            {/* Left */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#f1f5f9' }}>{p.title}</h3>
              {p.description && <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>{p.description}</p>}
              <span style={{
                display: 'inline-block', marginTop: '4px',
                padding: '2px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 500,
                backgroundColor: p.status === 'active' ? '#052e16' : '#1e2433',
                color: p.status === 'active' ? '#4ade80' : '#94a3b8',
                border: `1px solid ${p.status === 'active' ? '#166534' : '#334155'}`
              }}>
                {p.status}
              </span>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <select
                value={p.status}
                onChange={(e) => updateProjectStatus(p.id, e.target.value)}
                style={{ backgroundColor: '#0f1117', border: '1px solid #1e2433', color: '#94a3b8', padding: '0.35rem 0.6rem', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>

              <button
                onClick={() => navigate(`/projects/${p.id}`)}
                style={{ backgroundColor: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.35rem 0.9rem', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer' }}
              >
                View
              </button>

              <button
                onClick={() => deleteProject(p.id)}
                style={{ backgroundColor: 'transparent', border: '1px solid #7f1d1d', color: '#f87171', borderRadius: '8px', padding: '0.35rem 0.9rem', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div style={{ textAlign: 'center', color: '#334155', padding: '3rem', border: '1px dashed #1e2433', borderRadius: '12px' }}>
            No projects yet. Create one above ↑
          </div>
        )}
      </div>
    </div>
  )
}