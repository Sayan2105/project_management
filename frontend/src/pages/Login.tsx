import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

interface FormData {
  email: string
  password: string
}

export default function Login() {
  const { login } = useAuth()
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password)
    } catch {
      alert('Invalid credentials')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f1117', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ backgroundColor: '#161b27', border: '1px solid #1e2433', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '420px' }}>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f1f5f9', margin: '0 0 0.25rem' }}>Welcome back</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            {...register('email')}
            placeholder="Email"
            style={{ backgroundColor: '#0f1117', border: '1px solid #1e2433', borderRadius: '8px', padding: '0.65rem 0.9rem', color: '#e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            style={{ backgroundColor: '#0f1117', border: '1px solid #1e2433', borderRadius: '8px', padding: '0.65rem 0.9rem', color: '#e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
          />
          <button
            type="submit"
            style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.25rem' }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>
          No account?{' '}
          <Link to="/register" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>Register</Link>
        </p>
      </div>
    </div>
  )
}