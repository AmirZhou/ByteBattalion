import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return 'List of messages';
  }

  @Get(':id')
  getMessage(@Param('id') id: string) {
    console.log(id);
    return 'A single message';
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
    return 'Create a message';
  }
}
