import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
})

type FormData = yup.InferType<typeof schema>

export default function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/users/register/', data)
      alert('Registered successfully! Please login.')
      navigate('/login')
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <input
              {...register('username')}
              placeholder="Username"
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </div>
          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  )
}