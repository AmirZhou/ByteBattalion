import { Controller, Get, Post, Body, Param } from '@nestjs/common';

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
  createMessage(@Body() body: any) {
    console.log(body);
    return 'Create a message';
  }
}
