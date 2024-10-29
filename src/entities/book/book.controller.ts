import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';

@ApiTags('Book')
@Controller('/book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async createBook(@Body() bookData: CreateBookDTO) {
    const response = await this.bookService.createBook(bookData);

    return response;
  }

  @Get()
  async getAllBooks() {
    const response = await this.bookService.getAllBooks();

    return response;
  }

  @Get('/:internalId')
  async getBookById(@Param('internalId') internalId: string) {
    const response = await this.bookService.getBookById(internalId);

    return response;
  }

  @Patch('/:internalId')
  async updateBook(
    @Param('internalId') internalId: string,
    @Body() bookUpdateData: UpdateBookDTO,
  ) {
    const response = await this.bookService.updateBook(
      internalId,
      bookUpdateData,
    );

    return response;
  }

  @Delete('/:internalId')
  async deleteBook(@Param('internalId') internalId: string) {
    const response = await this.bookService.deleteBook(internalId);

    return response;
  }
}
