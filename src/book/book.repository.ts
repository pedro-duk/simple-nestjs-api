import { Injectable } from '@nestjs/common';
import Book, { IBook } from './book.entity';
import { CreateBookDTO } from './dto/CreateBook.dto';

@Injectable()
export class BookRepository {
  async save(bookData: CreateBookDTO) {
    const newBook = new Book(bookData);
    await newBook.save();
  }

  async findById(bookId: string) {
    return await Book.findById(bookId);
  }

  async update(bookId: string, bookUpdateData: Partial<IBook>) {
    return await Book.findOneAndUpdate({ _id: bookId }, bookUpdateData, {
      new: true,
    });
  }

  async delete(bookId: string) {
    return await Book.findByIdAndDelete(bookId);
  }

  async findAll() {
    return await Book.find({});
  }
}
