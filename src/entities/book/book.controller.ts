import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDTO } from './dto/CreateBook.dto';
import { UpdateBookDTO } from './dto/UpdateBook.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('/book')
export class BookController {
  constructor(private bookRepository: BookRepository) {}

  @Post()
  async createBook(@Body() bookData: CreateBookDTO) {
    const book = await this.bookRepository.save(bookData);

    return {
      book,
      message: 'Book saved successfully',
    };
  }

  @Get()
  async getAllBooks() {
    const books = await this.bookRepository.findAll();

    return {
      books,
      message: 'Books recovered',
    };
  }

  @Get('/:internalId')
  async getBookById(@Param('internalId') internalId: string) {
    const book = await this.bookRepository.findByInternalId(internalId);

    return {
      book,
      message: 'Book found',
    };
  }

  @Patch('/:internalId')
  async updateBook(
    @Param('internalId') internalId: string,
    @Body() bookUpdateData: UpdateBookDTO,
  ) {
    const book = await this.bookRepository.update(internalId, bookUpdateData);

    if (!book) {
      throw new NotFoundException('Book was not found');
    }

    return {
      updatedBook: book,
      message: 'Book has been updated',
    };
  }

  @Delete('/:internalId')
  async deleteBook(@Param('internalId') internalId: string) {
    const book = await this.bookRepository.delete(internalId);

    return {
      deletedBook: book,
      message: 'Book has been deleted',
    };
  }
}
