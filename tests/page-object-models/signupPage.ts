import { Page } from '@playwright/test'

export class SignupPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('http://localhost:8080/signup')
  }

  async fillFirstName(firstName: string) {
    await this.page.fill('#firstName', firstName)
  }

  async fillLastName(lastName: string) {
    await this.page.fill('#lastName', lastName)
  }

  async fillEmail(email: string) {
    await this.page.fill('#email', email)
  }

  async fillPassword(password: string) {
    await this.page.fill('#password', password)
  }

  async submit() {
    await this.page.click('button:has-text("Submit")')
  }

  async isLogoutVisible() {
    return this.page.isVisible('text=Log out')
  }

  async isErrorMessageVisible() {
    return this.page.isVisible('#error-message')
  }

  async getErrorMessageText() {
    return this.page.textContent('#error-message')
  }
}
