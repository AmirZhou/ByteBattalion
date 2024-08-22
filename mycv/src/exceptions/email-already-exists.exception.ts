export class EmailAlreadyExistsException extends Error {
  constructor(message: string = 'Email already exists') {
    super(message);
    this.name = 'EmailAlreadyExistsException';
  }
}
