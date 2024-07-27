import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return 'List of messages';
  }

  @Get(':id')
  getMessage() {
    return 'A single message';
  }

  @Post()
  createMessage() {
    return 'Create a message';
  }
}
