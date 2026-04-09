import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

interface Project {
  id: number
  title: string
  description: string
  status: string
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const fetchProjects = async () => {
    const res = await api.get(`/projects/?search=${search}&page=${page}`)
    setProjects(res.data.results)
    setHasNext(!!res.data.next)
  }

  useEffect(() => { fetchProjects() }, [search, page])

  const createProject = async () => {
    if (!title) return alert('Title is required')
    await api.post('/projects/', { title, description, status: 'active' })
    setTitle('')
    setDescription('')
    fetchProjects()
  }

  const deleteProject = async (id: number) => {
    await api.delete(`/projects/${id}/`)
    fetchProjects()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* Create Project */}
        <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
          <h2 className="font-semibold text-lg">New Project</h2>
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Title" className="w-full border p-2 rounded" />
          <input value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Description" className="w-full border p-2 rounded" />
          <button onClick={createProject}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create
          </button>
        </div>

        {/* Search */}
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search projects..." className="w-full border p-2 rounded mb-4 bg-white" />

        {/* Project List */}
        {projects.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-500 text-sm">{p.description}</p>
              <span className={`text-xs px-2 py-1 rounded ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                {p.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/projects/${p.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                View
              </button>
              <button onClick={() => deleteProject(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex gap-3 mt-4">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50">
            Prev
          </button>
          <button disabled={!hasNext} onClick={() => setPage(p => p + 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50">
            Next
          </button>
        </div>

      </div>
    </div>
  )
}