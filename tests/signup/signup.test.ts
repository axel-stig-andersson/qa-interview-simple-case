import { test, expect } from '@playwright/test'
import { SignupPage } from '../page-object-models/signupPage'

test.describe('Signup Form Tests', () => {
  let signupPage: SignupPage

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page)
    await signupPage.goto()
  })

  test('should display the signup page', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:8080/signup')
    await expect(page.locator('h2')).toHaveText('Become a member')
  })

  test('signup works with valid form values', async () => {
    await signupPage.fillFirstName('Axel')
    await signupPage.fillLastName('Andersson')
    await signupPage.fillEmail('axel.andersson@netlight.com')
    await signupPage.fillPassword('password123')
    await signupPage.submit()

    // Wait for the logout button to be visible
    const logoutVisible = await signupPage.isLogoutVisible()
    expect(logoutVisible).toBe(true)
  })

  test('signup with existing email displays error message', async () => {
    await signupPage.fillFirstName('Axel')
    await signupPage.fillLastName('Andersson')
    await signupPage.fillEmail('axel.andersson@netlight.com')
    await signupPage.fillPassword('password123')
    await signupPage.submit()

    // Attempt to sign up with the same email again
    await signupPage.goto()
    await signupPage.fillFirstName('John')
    await signupPage.fillLastName('Doe')
    await signupPage.fillEmail('axel.andersson@netlight.com')
    await signupPage.fillPassword('newpassword123')
    await signupPage.submit()

    const errorVisible = await signupPage.isErrorMessageVisible()
    expect(errorVisible).toBe(true)
    const errorMessage = await signupPage.getErrorMessageText()
    expect(errorMessage).toBe('User already exists')
  })
})
