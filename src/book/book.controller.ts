import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDTO } from './dto/CreateBook.dto';
import { UpdateBookDTO } from './dto/UpdateBook.dto';

@Controller('/books')
export class BookController {
  constructor(private bookRepository: BookRepository) {}

  @Post()
  async createBook(@Body() bookData: CreateBookDTO) {
    this.bookRepository.save(bookData);

    return {
      book: bookData,
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

  @Get('/:id')
  async getBookById(@Param('id') id: string) {
    const book = await this.bookRepository.findById(id);

    return {
      book,
      message: 'Book found',
    };
  }

  @Patch('/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() bookUpdateData: UpdateBookDTO,
  ) {
    const book = await this.bookRepository.update(id, bookUpdateData);

    return {
      updatedBook: book,
      message: 'Book has been updated',
    };
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string) {
    const book = await this.bookRepository.delete(id);

    return {
      deletedBook: book,
      message: 'Book has been deleted',
    };
  }
}
