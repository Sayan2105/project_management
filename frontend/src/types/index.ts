export interface User {
    id: number
    email: string
  }
  
  export interface Project {
    id: number
    title: string
    description: string
    status: 'active' | 'completed'
  }
  
  export interface Task {
    id: number
    title: string
    description: string
    status: 'todo' | 'in-progress' | 'done'
    due_date: string | null
  }
  
  export interface PaginatedResponse<T> {
    results: T[]
    next: string | null
    previous: string | null
  }