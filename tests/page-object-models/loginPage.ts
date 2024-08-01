import { Page } from '@playwright/test'

export class LoginPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }
  // Navigating to the page
  async goto() {
    await this.page.goto('http://localhost:8080/login')
  }
  // Use the ID of the field to fill in the email string
  async fillEmail(email: string) {
    await this.page.fill('#email', email)
  }

  // Use the ID of the field to fill in the password string
  async fillPassword(password: string) {
    await this.page.fill('#password', password)
  }
  // Using the login text on the button as selector prop
  async submit() {
    await this.page.click('button:has-text("Login")')
  }

  // Still using the Log out to confirm successfull login
  async isLogoutVisible() {
    return this.page.isVisible('text=Log out')
  }

  // When invalid credentials are submitted we check if an error message is visable
  async isErrorMessageVisible() {
    return this.page.isVisible('#error-message')
  }

  // Fetching the content of the error message for UX validation
  async getErrorMessageText() {
    return this.page.textContent('#error-message')
  }
}
