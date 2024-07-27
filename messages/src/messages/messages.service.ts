import { MessagesReository } from './messages.repository';

export class MessagesService {
  messagesRepository: MessagesReository;
  // this service is creating its own dependency. This is not a good practice in nestjs
  constructor() {
    this.messagesRepository = new MessagesReository();
  }

  findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  findAll() {
    return this.messagesRepository.findAll();
  }

  create(message: string) {
    return this.messagesRepository.create(message);
  }
}
