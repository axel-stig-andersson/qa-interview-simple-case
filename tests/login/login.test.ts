import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { LoginPage } from '../page-object-models/loginPage'

test.describe('login form tests', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test('logging in works with existing account', async () => {
    const existingUser = existingUsers[0]
    await loginPage.fillEmail(existingUser.email)
    await loginPage.fillPassword(existingUser.password)
    await loginPage.submit()

    // Wait for the logout button to be visible
    const logoutVisible = await loginPage.isLogoutVisible()
    expect(logoutVisible).toBe(true)
  })

  test('invalid credentials displays error message', async () => {
    await loginPage.fillEmail('invalid@mail.com')
    await loginPage.fillPassword('invalidPassword')
    await loginPage.submit()

    const errorVisible = await loginPage.isErrorMessageVisible()
    expect(errorVisible).toBe(true)

    const errorMessage = await loginPage.getErrorMessageText()
    expect(errorMessage).toBe('Invalid credentials')
  })
})
