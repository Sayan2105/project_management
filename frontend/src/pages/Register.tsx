import { useForm } from 'react-hook-form'
import api from '../api/axios'
import { useNavigate, Link } from 'react-router-dom'

interface FormData {
  email: string
  username: string
  password: string
}

export default function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/users/register/', data)
      alert('Registered. Login now.')
      navigate('/login')
    } catch {
      alert('Error')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f1117', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ backgroundColor: '#161b27', border: '1px solid #1e2433', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '420px' }}>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f1f5f9', margin: '0 0 0.25rem' }}>Create account</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Sign up to get started</p>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            {...register('email')}
            placeholder="Email"
            style={{ backgroundColor: '#0f1117', border: '1px solid #1e2433', borderRadius: '8px', padding: '0.65rem 0.9rem', color: '#e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            {...register('username')}
            placeholder="Username"
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
            style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.25rem' }}
          >
            Register
          </button>
        </form>

        <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>Login</Link>
        </p>
      </div>
    </div>
  )
}