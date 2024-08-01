import React, { useCallback, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { validateLoginFields } from '../../utils/validations'
import { PasswordField } from '../../components/PasswordField'
import { loginUser } from '../../database'
import { User } from '../../App'

const styleProps = {
  fullWidth: true,
  required: true,
  variant: 'filled',
} as const

interface FormProps {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const Form: React.FC<FormProps> = ({ setUser }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [invalidCredentials, setInvalidCredentials] = useState(false)

  const handleLogin = useCallback(async () => {
    if (validateLoginFields(email, password)) {
      const user = await loginUser(email, password)

      if (!user) setInvalidCredentials(true)
      else {
        setUser(user)
      }
    }
  }, [email, password, setUser])

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        {...styleProps}
      />
      <PasswordField
        id="password"
        password={password}
        setPassword={setPassword}
        label={'Password'}
        {...styleProps}
      />
      {invalidCredentials && (
        <div id="error-message" style={{ color: 'red' }}>
          Invalid credentials
        </div>
      )}
      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={!validateLoginFields(email, password)}
      >
        Login
      </Button>
    </form>
  )
}
