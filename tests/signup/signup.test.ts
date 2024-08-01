import { test, expect } from '@playwright/test'
import { SignupPage } from '../page-object-models/signupPage'
import { invalidFieldTestCases } from './utils/constants'

test.describe('Signup Form Tests', () => {
  let signupPage: SignupPage

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page)
    await signupPage.goto()
  })

  const fillForm = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    await signupPage.fillFirstName(firstName)
    await signupPage.fillLastName(lastName)
    await signupPage.fillEmail(email)
    await signupPage.fillPassword(password)
  }

  const submitAndCheckError = async (expectedError: string) => {
    await signupPage.submit()
    const errorVisible = await signupPage.isErrorMessageVisible()
    expect(errorVisible).toBe(true)
    const errorMessage = await signupPage.getErrorMessageText()
    expect(errorMessage).toBe(expectedError)
  }

  test('should display the signup page', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:8080/signup')
    await expect(page.locator('h2')).toHaveText('Become a member')
  })

  test('signup works with valid form values', async () => {
    await fillForm(
      'Axel',
      'Andersson',
      'axel.andersson@netlight.com',
      'password123',
    )
    await signupPage.submit()

    // Wait for the logout button to be visible
    const logoutVisible = await signupPage.isLogoutVisible()
    expect(logoutVisible).toBe(true)
  })

  test('signup with existing email displays error message', async () => {
    await fillForm(
      'Axel',
      'Andersson',
      'axel.andersson@netlight.com',
      'password123',
    )
    await signupPage.submit()

    // Attempt to sign up with the same email again
    await signupPage.goto()
    await fillForm(
      'John',
      'Doe',
      'axel.andersson@netlight.com',
      'newpassword123',
    )
    await submitAndCheckError('User already exists')
  })

  for (const {
    field,
    firstName,
    lastName,
    email,
    password,
    error,
  } of invalidFieldTestCases) {
    test(`invalid ${field} displays error message`, async () => {
      await fillForm(firstName, lastName, email, password)
      await submitAndCheckError(error)
    })
  }
})
