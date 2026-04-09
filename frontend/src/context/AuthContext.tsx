import { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

interface AuthContextType {
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    const res = await api.post('/users/login/', { email, password })
    localStorage.setItem('access_token', res.data.access)
    setUser(res.data)
    navigate('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!localStorage.getItem('access_token') }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)!