import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

import css from './CreateAccountPage.module.css'

import LogoutButton from '@/components/LogoutButton'
import { QUERY_KEYS } from '@/core/constants'
import Alert from '@/framework/Alert'
import Button from '@/framework/Button'
import Input from '@/framework/Input'
import { useCreateAccount } from '@/hooks/api/useCreateAccount'

const CreateAccountPage = () => {
  const queryClient = useQueryClient()
  const { mutate: createAccountMutation } = useCreateAccount()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
  })
  const [error, setError] = useState('')

  const handleChangeFirst = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((previousState) => ({
      ...previousState,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      first_name: event.target.value,
    }))
  }

  const handleChangeLast = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((previousState) => ({
      ...previousState,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      last_name: event.target.value,
    }))
  }

  const isFormValid = formState.first_name && formState.last_name

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    if (!isFormValid) return
    createAccountMutation(formState, {
      onSuccess: (data) => {
        queryClient.setQueryData(QUERY_KEYS.me, data)
      },
      onError: () => {
        setIsSubmitting(false)
        setError('Something went wrong, please try again')
      },
    })
  }

  return (
    <div className={css.root}>
      <div className={css.logout}>
        <LogoutButton variant="link" />
      </div>
      <form className={css.inner} onSubmit={handleSubmit}>
        {error && (
          <Alert type="error" title="Whoops!" className="mb-5">
            {error}
          </Alert>
        )}
        <h1 className={css.title}>👋 Hello! 👋</h1>
        <p className={css.explainer}>
          Before we get started, what should we call you?
        </p>
        <div className={css.nameContainer}>
          <Input
            label="First name"
            name="first_name"
            placeholder="Frederick"
            containerClassName="w-full"
            value={formState.first_name}
            onChange={handleChangeFirst}
          />
          <Input
            label="Last name"
            name="last_name"
            placeholder="Redington"
            containerClassName="w-full"
            onChange={handleChangeLast}
            value={formState.last_name}
          />
        </div>
        <Button
          variant="secondary"
          disabled={!isFormValid || isSubmitting}
          size="large"
          type="submit"
          fullWidth
        >
          Lets Go!
        </Button>
      </form>
    </div>
  )
}

export default CreateAccountPage
