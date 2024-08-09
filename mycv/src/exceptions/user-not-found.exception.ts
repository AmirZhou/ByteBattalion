export class UserNotFoundException extends Error {
  constructor(message: string = 'User not Found') {
    super(message);
    this.name = 'UserNotFoundException';
  }
}
