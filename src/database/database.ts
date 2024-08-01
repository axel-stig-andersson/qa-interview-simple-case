import { User } from '../App'

export const key = 'users'

export const createUser = async (user: User): Promise<User | undefined> => {
  const data = readDatabase()
  if (data.users.find((existingUser) => existingUser.email === user.email))
    return undefined

  data.users.push(user)
  localStorage.setItem(key, JSON.stringify(data))

  return user
}

export const loginUser = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const data = readDatabase()
  const user = data.users.find(
    (user) => user.email === email && user.password === password,
  )
  if (user) return user

  return null
}

const readDatabase = (): { users: User[] } => {
  const data = localStorage.getItem(key)

  if (data === null) return { users: [] }

  return JSON.parse(data) as { users: User[] }
}
