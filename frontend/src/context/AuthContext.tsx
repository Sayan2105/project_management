import { createContext, useContext, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))

  const login = async (email: string, password: string) => {
    const res = await api.post('/users/login/', { email, password })
    localStorage.setItem('token', res.data.access)
    setToken(res.data.access)
    navigate('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}