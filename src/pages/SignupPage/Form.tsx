import React, { useCallback, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { validateSignupFields } from '../../utils/validations'
import { PasswordField } from '../../components/PasswordField'
import { User } from '../../App'
import { createUser } from '../../database'

const styleProps = {
  fullWidth: true,
  required: true,
  variant: 'filled',
} as const

interface FormProps {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const Form: React.FC<FormProps> = ({ setUser }) => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = useCallback(async () => {
    if (validateSignupFields(firstName, lastName, email, password)) {
      const user = await createUser({ firstName, lastName, email, password })
      if (user) {
        setUser(user)
        setErrorMessage(null)
      } else {
        setErrorMessage('User already exists')
      }
    } else {
      setErrorMessage('Invalid signup details')
    }
  }, [firstName, lastName, email, password, setUser])

  const labels = getLabels()

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <TextField
        id="firstName"
        label={labels.firstName}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        {...styleProps}
      />
      <TextField
        id="lastName"
        label={labels.lastName}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        {...styleProps}
      />
      <TextField
        id="email"
        label={labels.email}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        {...styleProps}
      />
      <PasswordField
        id="password"
        label={labels.password}
        password={password}
        setPassword={setPassword}
        {...styleProps}
      />
      {errorMessage && (
        <div id="error-message" style={{ color: 'red' }}>
          {errorMessage}
        </div>
      )}
      <Button variant="contained" onClick={handleSubmit}>
        {labels.submit}
      </Button>
    </form>
  )
}

const getLabels = (): {
  firstName: string
  lastName: string
  email: string
  password: string
  submit: string
} => {
  return {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    password: 'Password',
    submit: 'Submit',
  }
}
