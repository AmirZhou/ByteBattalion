export class PasswordIncorrectException extends Error {
  constructor(message: string = "Password doesn't match") {
    super(message);
    this.name = 'PasswordIncorrectException';
  }
}
