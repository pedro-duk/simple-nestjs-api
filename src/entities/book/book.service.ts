import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async createBook(bookData: CreateBookDTO) {
    const book = await this.bookRepository.save(bookData);

    return {
      book,
      message: 'Book saved successfully',
    };
  }

  async getAllBooks() {
    const books = await this.bookRepository.findAll();

    return {
      books,
      message: 'Books recovered',
    };
  }

  async getBookById(internalId: string) {
    const book = await this.bookRepository.findByInternalId(internalId);

    if (!book) {
      throw new NotFoundException('Book was not found');
    }

    return {
      book,
      message: 'Book found',
    };
  }

  async updateBook(internalId: string, bookUpdateData: UpdateBookDTO) {
    const book = await this.bookRepository.update(internalId, bookUpdateData);

    if (!book) {
      throw new NotFoundException('Book was not found');
    }

    return {
      updatedBook: book,
      message: 'Book has been updated',
    };
  }

  async deleteBook(internalId: string) {
    const book = await this.bookRepository.delete(internalId);

    if (!book) {
      throw new NotFoundException('Book was not found');
    }

    return {
      deletedBook: book,
      message: 'Book has been deleted',
    };
  }
}
